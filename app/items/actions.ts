"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { itemMasterFields } from "@/lib/item-master-fields";
import { getItemIdentityKey } from "@/lib/item-master-utils";
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

function parseIdentityKey(identityKey: string) {
  const [warehouse, company, item_number] = identityKey.split("||");
  return { warehouse: warehouse ?? "", company: company ?? "", item_number: item_number ?? "" };
}

function readItemPayload(formData: FormData) {
  const payload: Record<string, string> = {};
  for (const field of itemMasterFields) {
    payload[field.key] = String(formData.get(field.key) ?? "").trim();
  }
  return payload;
}

function validateRequiredFields(payload: Record<string, string>) {
  return itemMasterFields.every((field) => !field.required || Boolean(payload[field.key]));
}

export async function createItemAction(formData: FormData) {
  const nextIds = String(formData.get("nextIds") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const payload = readItemPayload(formData);

  if (!validateRequiredFields(payload)) {
    backToItems("Please enter all mandatory Item Master details.", true);
  }

  const result = await createItem(payload);
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

  const identity = parseIdentityKey(String(formData.get("originalIdentity") ?? ""));
  const payload = readItemPayload(formData);

  if (!identity.warehouse || !identity.company || !identity.item_number || !validateRequiredFields(payload)) {
    backToItems("Please enter all mandatory Item Master details.", true);
  }

  const result = await updateItem(identity, payload);
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

  const identity = parseIdentityKey(String(formData.get("identity") ?? ""));

  if (!identity.warehouse || !identity.company || !identity.item_number) {
    backToItems("Please select an item to delete.", true);
  }

  const result = await deleteItem(identity);
  if (!result.ok) {
    backToItems(result.message, true);
  }

  revalidatePath("/items");
  redirect(nextActionUrl("delete", nextIds));
}

export async function getSelectedItems(ids: string[]) {
  const { items } = await getItems();
  return ids
    .map((id) => items.find((item) => getItemIdentityKey(item) === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}
