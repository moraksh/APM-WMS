import { RecordBrowser } from "@/components/record-browser";
import { getItems } from "@/lib/warehouse-service";

type Params = {
  actionMessage?: string;
  actionState?: "success" | "error";
};

export default async function ItemsPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const { items } = await getItems();
  const params = (await searchParams) ?? {};

  return (
    <RecordBrowser
      title="Item Master"
      basePath="/items"
      message={params.actionMessage}
      messageState={params.actionState}
      columns={[
        { key: "itemCode", label: "Item Code" },
        { key: "description", label: "Description" },
        { key: "category", label: "Category" },
        { key: "unit", label: "Unit" },
        { key: "reorderLevel", label: "Reorder Level" },
        { key: "status", label: "Status" },
      ]}
      rows={items.map((item) => ({
        id: item.itemCode,
        values: {
          itemCode: item.itemCode,
          description: item.description,
          category: item.category,
          unit: item.unit,
          reorderLevel: String(item.reorderLevel),
          status: item.status,
        },
      }))}
    />
  );
}
