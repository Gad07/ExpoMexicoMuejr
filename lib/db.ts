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

export function readJSON<T>(filename: string): T[] {
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

export function writeJSON<T>(filename: string, data: T[]): void {
  try {
    ensureDataDir();
    const filepath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`[writeJSON] Notice: Read-only serverless environment for ${filename}`, err);
  }
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
  return readJSON<T>(fallbackJsonFile);
}