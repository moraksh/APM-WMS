import { RecordBrowser } from "@/components/record-browser";
import { receipts } from "@/lib/mock-data";

export default function GoodsReceiptsPage() {
  return (
    <RecordBrowser
      title="Goods Receipt"
      basePath="/goods-receipts"
      columns={[
        { key: "receiptNo", label: "Receipt No" },
        { key: "supplier", label: "Supplier" },
        { key: "itemCode", label: "Item Code" },
        { key: "quantity", label: "Quantity" },
        { key: "location", label: "Location" },
        { key: "status", label: "Status" },
      ]}
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
