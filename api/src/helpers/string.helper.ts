export default function toStringSafe(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  try {
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  } catch {
    return '';
  }
}
