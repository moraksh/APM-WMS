import type { Item } from "@/lib/mock-data";
import type { Database } from "@/lib/supabase/types";
import { items as fallbackItems } from "@/lib/mock-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function filterItems(items: Item[], query?: string) {
  if (!query) {
    return items;
  }

  const normalized = query.trim().toLowerCase();

  return items.filter((item) => {
    return (
      item.itemCode.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized)
    );
  });
}

export async function getItems(query?: string): Promise<{ items: Item[]; source: "supabase" | "mock"; error?: string }> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      items: filterItems(fallbackItems, query),
      source: "mock",
      error: "Missing Supabase environment variables.",
    };
  }

  const { data, error } = await (supabase.from("items") as any)
    .select("item_code, description, category, unit, reorder_level, status")
    .order("item_code", { ascending: true });

  if (error || !data) {
    return {
      items: filterItems(fallbackItems, query),
      source: "mock",
      error: error?.message ?? "Unable to load items from Supabase.",
    };
  }

  type ItemRow = Pick<
    Database["public"]["Tables"]["items"]["Row"],
    "item_code" | "description" | "category" | "unit" | "reorder_level" | "status"
  >;

  const typedData = data as ItemRow[];
  const mapped: Item[] = typedData.map((item) => ({
    itemCode: item.item_code,
    description: item.description,
    category: item.category,
    unit: item.unit,
    reorderLevel: item.reorder_level,
    status: item.status,
  }));

  return {
    items: filterItems(mapped, query),
    source: "supabase",
  };
}

export async function createItem(input: {
  itemCode: string;
  description: string;
  category: string;
  unit: string;
  reorderLevel: number;
  status: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase environment variables are missing." };
  }

  const payload: Database["public"]["Tables"]["items"]["Insert"] = {
    item_code: input.itemCode,
    description: input.description,
    category: input.category,
    unit: input.unit,
    reorder_level: input.reorderLevel,
    status: input.status,
  };

  const { error } = await (supabase.from("items") as any).insert(payload);

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}

export async function updateItem(
  originalItemCode: string,
  input: {
    itemCode: string;
    description: string;
    category: string;
    unit: string;
    reorderLevel: number;
    status: string;
  }
): Promise<{ ok: true } | { ok: false; message: string }> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase environment variables are missing." };
  }

  const payload: Database["public"]["Tables"]["items"]["Update"] = {
    item_code: input.itemCode,
    description: input.description,
    category: input.category,
    unit: input.unit,
    reorder_level: input.reorderLevel,
    status: input.status,
  };

  const { error } = await (supabase.from("items") as any)
    .update(payload)
    .eq("item_code", originalItemCode);

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}

export async function deleteItem(itemCode: string): Promise<{ ok: true } | { ok: false; message: string }> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase environment variables are missing." };
  }

  const { error } = await (supabase.from("items") as any).delete().eq("item_code", itemCode);

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
