import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const DATA_DIR = path.join(process.cwd(), 'data');
const BACKUPS_DIR = path.join(process.cwd(), 'public', 'backups');

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

const memoryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 5000; // 5 second in-memory cache for fast response times

export function readJSONLocal<T>(filename: string): T[] {
  const cached = memoryCache.get(`local_${filename}`);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as T[];
  }

  const filepath = path.join(DATA_DIR, filename);
  const backupPath = path.join(BACKUPS_DIR, filename);
  try {
    let result: T[] = [];
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf-8');
      result = JSON.parse(raw);
    } else if (fs.existsSync(backupPath)) {
      const raw = fs.readFileSync(backupPath, 'utf-8');
      result = JSON.parse(raw);
    }
    memoryCache.set(`local_${filename}`, { data: result, timestamp: Date.now() });
    return result;
  } catch {
    return [];
  }
}

export async function readJSONAsync<T>(filename: string): Promise<T[]> {
  const cached = memoryCache.get(`async_${filename}`);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as T[];
  }

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('page_modules')
        .select('items_json')
        .eq('id', `store_${filename}`)
        .single();

      if (!error && data && data.items_json !== null && data.items_json !== undefined) {
        const res = data.items_json as T[];
        memoryCache.set(`async_${filename}`, { data: res, timestamp: Date.now() });
        return res;
      }
    } catch {
      // Fallback below
    }
  }
  const localRes = readJSONLocal<T>(filename);
  memoryCache.set(`async_${filename}`, { data: localRes, timestamp: Date.now() });
  return localRes;
}

export function readJSON<T>(filename: string): T[] {
  return readJSONLocal<T>(filename);
}

export async function writeJSONAsync<T>(filename: string, data: T): Promise<void> {
  memoryCache.delete(`local_${filename}`);
  memoryCache.delete(`async_${filename}`);
  try {
    ensureDataDir();
    const filepath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');

    if (fs.existsSync(BACKUPS_DIR)) {
      const backupPath = path.join(BACKUPS_DIR, filename);
      fs.writeFileSync(backupPath, JSON.stringify(data, null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn(`[writeJSON] Error writing local ${filename}:`, err);
  }

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('page_modules').upsert({
        id: `store_${filename}`,
        page_key: 'global',
        module_type: 'json_store',
        title: filename,
        items_json: data,
      });
    } catch (e) {
      console.warn(`[writeJSON] Supabase sync error for ${filename}:`, e);
    }
  }
}

export function writeJSON<T>(filename: string, data: T): void {
  writeJSONAsync(filename, data).catch((err) => {
    console.warn(`[writeJSON] Background sync error for ${filename}:`, err);
  });
}

/**
 * Reads data from Supabase first. If offline or Supabase fails, falls back to JSON backup.
 */
export async function readDataFromSupabase<T>(tableName: string, fallbackJsonFile: string): Promise<T[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (!error && data && data.length > 0) {
        return data as T[];
      }
    } catch {
      // Fallback below
    }
  }
  return readJSONAsync<T>(fallbackJsonFile);
}