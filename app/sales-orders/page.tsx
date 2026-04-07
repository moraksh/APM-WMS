import { RecordBrowser } from "@/components/record-browser";
import { salesOrders } from "@/lib/mock-data";

export default function SalesOrdersPage() {
  return (
    <RecordBrowser
      title="Sales Orders"
      basePath="/sales-orders"
      columns={[
        { key: "orderNo", label: "Order No" },
        { key: "customer", label: "Customer" },
        { key: "orderDate", label: "Order Date" },
        { key: "items", label: "Items" },
        { key: "shipFrom", label: "Ship From" },
        { key: "status", label: "Status" },
      ]}
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
