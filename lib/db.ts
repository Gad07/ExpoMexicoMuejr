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

export function readJSONLocal<T>(filename: string): T[] {
  const filepath = path.join(DATA_DIR, filename);
  const backupPath = path.join(BACKUPS_DIR, filename);
  try {
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf-8');
      return JSON.parse(raw);
    }
    if (fs.existsSync(backupPath)) {
      const raw = fs.readFileSync(backupPath, 'utf-8');
      return JSON.parse(raw);
    }
    return [];
  } catch {
    return [];
  }
}

export async function readJSONAsync<T>(filename: string): Promise<T[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('page_modules')
        .select('items_json')
        .eq('id', `store_${filename}`)
        .single();

      if (!error && data && data.items_json !== null && data.items_json !== undefined) {
        return data.items_json as T[];
      }
    } catch {
      // Fallback below
    }
  }
  return readJSONLocal<T>(filename);
}

export function readJSON<T>(filename: string): T[] {
  return readJSONLocal<T>(filename);
}

export async function writeJSONAsync<T>(filename: string, data: T): Promise<void> {
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