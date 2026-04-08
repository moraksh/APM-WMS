import { RecordBrowser } from "@/components/record-browser";
import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { getItems } from "@/lib/warehouse-service";

type Params = {
  actionMessage?: string;
  actionState?: "success" | "error";
};

export default async function ItemsPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const { items } = await getItems();
  const params = (await searchParams) ?? {};
  const fieldSettings = await getProcessFieldSettings("items");
  const visibleKeys = ["warehouse", "company", "item_number", "item_description_1"];

  return (
    <RecordBrowser
      title="Item Master"
      basePath="/items"
      message={params.actionMessage}
      messageState={params.actionState}
      columns={visibleKeys.map((key) => ({
        key,
        label: fieldSettings.find((field) => field.key === key)?.label ?? key,
      }))}
      rows={items.map((item) => ({
        id: [item.warehouse, item.company, item.item_number].join("||"),
        values: {
          warehouse: item.warehouse,
          company: item.company,
          item_number: item.item_number,
          item_description_1: item.item_description_1,
        },
      }))}
    />
  );
}
