import { createSupabaseServerClient } from "@/lib/supabase/server";
import { processFieldDefinitions, type ProcessFieldDefinition, type ProcessKey } from "@/lib/process-field-settings";

export type ProcessFieldSetting = ProcessFieldDefinition;

export async function getProcessFieldSettings(process: ProcessKey): Promise<ProcessFieldSetting[]> {
  const defaults = processFieldDefinitions[process];
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return defaults;
  }

  const { data, error } = await (supabase.from("process_field_settings") as any)
    .select("field_key, display_label, is_visible, is_required, sort_order")
    .eq("process_name", process)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return defaults;
  }

  const overrides = new Map<string, { display_label: string | null; is_visible: boolean | null; is_required: boolean | null }>();
  for (const row of data as Array<Record<string, unknown>>) {
    overrides.set(String(row.field_key ?? ""), {
      display_label: row.display_label ? String(row.display_label) : null,
      is_visible: typeof row.is_visible === "boolean" ? row.is_visible : null,
      is_required: typeof row.is_required === "boolean" ? row.is_required : null,
    });
  }

  return defaults.map((field) => {
    const override = overrides.get(field.key);
    return {
      key: field.key,
      label: override?.display_label?.trim() ? override.display_label : field.label,
      visible: typeof override?.is_visible === "boolean" ? override.is_visible : field.visible,
      required: typeof override?.is_required === "boolean" ? override.is_required : field.required,
    };
  });
}

export async function saveProcessFieldSettings(
  process: ProcessKey,
  settings: ProcessFieldSetting[]
): Promise<{ ok: true } | { ok: false; message: string }> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase environment variables are missing." };
  }

  const payload = settings.map((field, index) => ({
    process_name: process,
    field_key: field.key,
    display_label: field.label,
    is_visible: field.visible,
    is_required: field.required,
    sort_order: index + 1,
  }));

  const { error } = await (supabase.from("process_field_settings") as any).upsert(payload, {
    onConflict: "process_name,field_key",
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
