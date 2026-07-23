/**
 * Helper to convert any standard Dropbox share link (e.g. www.dropbox.com/...&dl=0)
 * into a direct media stream URL (https://dl.dropboxusercontent.com/...&raw=1)
 */
export function cleanDropboxUrl(url?: string): string {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();
  if (cleaned.includes('dropbox.com')) {
    cleaned = cleaned.replace(/https?:\/\/(www\.)?dropbox\.com/, 'https://dl.dropboxusercontent.com');
    if (cleaned.includes('dl=0')) {
      cleaned = cleaned.replace('dl=0', 'raw=1');
    } else if (cleaned.includes('dl=1')) {
      cleaned = cleaned.replace('dl=1', 'raw=1');
    } else if (!cleaned.includes('raw=1')) {
      cleaned += (cleaned.includes('?') ? '&raw=1' : '?raw=1');
    }
  }
  return cleaned;
}

export function cleanDropboxUrlsInObject<T>(obj: T): T {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    return cleanDropboxUrl(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => cleanDropboxUrlsInObject(item)) as unknown as T;
  }
  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      newObj[key] = cleanDropboxUrlsInObject((obj as any)[key]);
    }
    return newObj as T;
  }
  return obj;
}
