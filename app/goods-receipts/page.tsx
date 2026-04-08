import { RecordBrowser } from "@/components/record-browser";
import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { receipts } from "@/lib/mock-data";

export default async function GoodsReceiptsPage() {
  const fieldSettings = await getProcessFieldSettings("goods_receipts");
  const visibleKeys = ["receiptNo", "supplier", "itemCode", "quantity", "location", "status"];

  return (
    <RecordBrowser
      title="Goods Receipt"
      basePath="/goods-receipts"
      columns={visibleKeys.map((key) => ({
        key,
        label: fieldSettings.find((field) => field.key === key)?.label ?? key,
      }))}
      rows={receipts.map((receipt) => ({
        id: receipt.receiptNo,
        values: {
          receiptNo: receipt.receiptNo,
          supplier: receipt.supplier,
          itemCode: receipt.itemCode,
          quantity: String(receipt.quantity),
          location: receipt.location,
          status: receipt.status,
        },
      }))}
    />
  );
}
