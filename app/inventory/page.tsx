import { RecordBrowser } from "@/components/record-browser";
import { inventory } from "@/lib/mock-data";

export default function InventoryPage() {
  return (
    <RecordBrowser
      title="Inventory"
      basePath="/inventory"
      columns={[
        { key: "itemCode", label: "Item Code" },
        { key: "description", label: "Description" },
        { key: "location", label: "Location" },
        { key: "onHand", label: "On Hand" },
        { key: "allocated", label: "Allocated" },
        { key: "available", label: "Available" },
      ]}
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
