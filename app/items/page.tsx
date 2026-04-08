import { RecordBrowser } from "@/components/record-browser";
import { getItems } from "@/lib/warehouse-service";
type Params = { actionMessage?: string; actionState?: "success" | "error" };
export default async function ItemsPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const { items } = await getItems();
  const params = (await searchParams) ?? {};
  return <RecordBrowser title="Item Master" basePath="/items" message={params.actionMessage} messageState={params.actionState} columns={[{ key: "warehouse", label: "Warehouse" }, { key: "company", label: "Company" }, { key: "item_number", label: "Item Number" }, { key: "item_description_1", label: "Item Description 1" }]} rows={items.map((item) => ({ id: [item.warehouse, item.company, item.item_number].join("||"), values: { warehouse: item.warehouse, company: item.company, item_number: item.item_number, item_description_1: item.item_description_1 } }))} />;
}
