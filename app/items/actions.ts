"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createItem, deleteItem, getItems, updateItem } from "@/lib/warehouse-service";

function nextActionUrl(mode: string, ids: string[]) {
  if (ids.length === 0) {
    return "/items";
  }

  return `/items/action?mode=${encodeURIComponent(mode)}&ids=${encodeURIComponent(ids.join(","))}`;
}

function backToItems(message: string, error = false) {
  redirect(`/items?actionMessage=${encodeURIComponent(message)}&actionState=${error ? "error" : "success"}`);
}

export async function createItemAction(formData: FormData) {
  const nextIds = String(formData.get("nextIds") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const itemCode = String(formData.get("itemCode") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const reorderLevel = Number.parseInt(String(formData.get("reorderLevel") ?? "0"), 10);
  const status = String(formData.get("status") ?? "Active").trim();

  if (!itemCode || !description || !category || !unit || Number.isNaN(reorderLevel) || reorderLevel < 0) {
    backToItems("Please enter valid item details.", true);
  }

  const result = await createItem({
    itemCode,
    description,
    category,
    unit,
    reorderLevel,
    status,
  });

  if (!result.ok) {
    backToItems(result.message, true);
  }

  revalidatePath("/items");
  redirect(nextActionUrl("copy", nextIds));
}

export async function updateItemAction(formData: FormData) {
  const nextIds = String(formData.get("nextIds") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const originalItemCode = String(formData.get("originalItemCode") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const reorderLevel = Number.parseInt(String(formData.get("reorderLevel") ?? "0"), 10);
  const status = String(formData.get("status") ?? "Active").trim();

  if (!originalItemCode || !description || !category || !unit || Number.isNaN(reorderLevel) || reorderLevel < 0) {
    backToItems("Please enter valid item details.", true);
  }

  const result = await updateItem(originalItemCode, {
    itemCode: originalItemCode,
    description,
    category,
    unit,
    reorderLevel,
    status,
  });

  if (!result.ok) {
    backToItems(result.message, true);
  }

  revalidatePath("/items");
  redirect(nextActionUrl("change", nextIds));
}

export async function deleteItemAction(formData: FormData) {
  const nextIds = String(formData.get("nextIds") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const itemCode = String(formData.get("itemCode") ?? "").trim();

  if (!itemCode) {
    backToItems("Please select an item to delete.", true);
  }

  const result = await deleteItem(itemCode);

  if (!result.ok) {
    backToItems(result.message, true);
  }

  revalidatePath("/items");
  redirect(nextActionUrl("delete", nextIds));
}

export async function getSelectedItems(ids: string[]) {
  const { items } = await getItems();
  return ids
    .map((id) => items.find((item) => item.itemCode === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}
