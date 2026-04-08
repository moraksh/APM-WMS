import { RecordBrowser } from "@/components/record-browser";
import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { salesOrders } from "@/lib/mock-data";

export default async function SalesOrdersPage() {
  const fieldSettings = await getProcessFieldSettings("sales_orders");
  const visibleKeys = ["orderNo", "customer", "orderDate", "items", "shipFrom", "status"];

  return (
    <RecordBrowser
      title="Sales Orders"
      basePath="/sales-orders"
      columns={visibleKeys.map((key) => ({
        key,
        label: fieldSettings.find((field) => field.key === key)?.label ?? key,
      }))}
      rows={salesOrders.map((order) => ({
        id: order.orderNo,
        values: {
          orderNo: order.orderNo,
          customer: order.customer,
          orderDate: order.orderDate,
          items: String(order.items),
          shipFrom: order.shipFrom,
          status: order.status,
        },
      }))}
    />
  );
}
