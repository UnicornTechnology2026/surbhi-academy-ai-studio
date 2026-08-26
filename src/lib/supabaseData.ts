import { supabase } from './supabaseClient';
import { toCamelCase, toSnakeCase } from './caseUtils';

// ---- List tables (courses, faculty, gallery, etc.) ----

export async function fetchTable<T>(table: string, fallback: T[]): Promise<T[]> {
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    // eslint-disable-next-line no-console
    console.error(`[supabase] failed to load "${table}":`, error.message);
    return fallback;
  }
  if (!data || data.length === 0) return fallback;
  return toCamelCase(data) as T[];
}

export async function insertRow<T>(table: string, row: unknown): Promise<T> {
  const { data, error } = await supabase
    .from(table)
    .insert(toSnakeCase(row))
    .select()
    .single();
  if (error) throw error;
  return toCamelCase(data) as T;
}

export async function updateRow<T>(table: string, id: string, updated: unknown): Promise<T> {
  const { data, error } = await supabase
    .from(table)
    .update(toSnakeCase(updated))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return toCamelCase(data) as T;
}

export async function deleteRow(table: string, id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

// ---- Single-row "content" tables (hero_content, about_content, site_settings) ----
// Each of these tables has exactly one row (id = 1) holding a `data` jsonb column.

export async function fetchContent<T>(table: string, fallback: T): Promise<T> {
  const { data, error } = await supabase.from(table).select('data').eq('id', 1).single();
  if (error || !data?.data || Object.keys(data.data).length === 0) {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`[supabase] failed to load "${table}":`, error.message);
    }
    return fallback;
  }
  return { ...fallback, ...(toCamelCase(data.data) as object) } as T;
}

export async function saveContent<T>(table: string, content: T): Promise<void> {
  const { error } = await supabase
    .from(table)
    .upsert({ id: 1, data: toSnakeCase(content), updated_at: new Date().toISOString() });
  if (error) throw error;
}