"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveProcessFieldSettings } from "@/lib/field-settings-service";
import { processFieldDefinitions, type ProcessKey } from "@/lib/process-field-settings";

export async function saveFieldSettingsAction(formData: FormData) {
  const process = String(formData.get("process") ?? "items") as ProcessKey;
  const defaults = processFieldDefinitions[process] ?? processFieldDefinitions.items;

  const settings = defaults.map((field) => ({
    key: field.key,
    label: String(formData.get(`label_${field.key}`) ?? field.label).trim() || field.label,
    visible: formData.get(`visible_${field.key}`) === "on",
    required: formData.get(`required_${field.key}`) === "on",
  }));

  const result = await saveProcessFieldSettings(process, settings);

  if (!result.ok) {
    redirect(`/settings?process=${encodeURIComponent(process)}&message=${encodeURIComponent(result.message)}&state=error`);
  }

  revalidatePath("/settings");
  revalidatePath("/items");
  revalidatePath("/items/action");
  revalidatePath("/goods-receipts/action");
  revalidatePath("/inventory/action");
  revalidatePath("/locations/action");
  revalidatePath("/sales-orders/action");
  redirect(`/settings?process=${encodeURIComponent(process)}&message=${encodeURIComponent("Settings saved.")}&state=success`);
}
