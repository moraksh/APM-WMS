import { RecordBrowser } from "@/components/record-browser";
import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { inventory } from "@/lib/mock-data";

export default async function InventoryPage() {
  const fieldSettings = await getProcessFieldSettings("inventory");
  const visibleKeys = ["itemCode", "description", "location", "onHand", "allocated", "available"];

  return (
    <RecordBrowser
      title="Inventory"
      basePath="/inventory"
      columns={visibleKeys.map((key) => ({
        key,
        label: fieldSettings.find((field) => field.key === key)?.label ?? key,
      }))}
      rows={inventory.map((row) => ({
        id: `${row.itemCode}-${row.location}`,
        values: {
          itemCode: row.itemCode,
          description: row.description,
          location: row.location,
          onHand: String(row.onHand),
          allocated: String(row.allocated),
          available: String(row.available),
        },
      }))}
    />
  );
}
