import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { salesOrders } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function SalesOrdersActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = salesOrders.find((order) => order.orderNo === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);
  const fieldSettings = await getProcessFieldSettings("sales_orders");
  const values: Record<string, string> = {
    orderNo: current?.orderNo ?? "",
    customer: current?.customer ?? "",
    orderDate: current?.orderDate ?? "",
    items: current ? String(current.items) : "",
    shipFrom: current?.shipFrom ?? "",
    status: current?.status ?? "",
  };

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Sales Orders</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Sales Order</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new sales order record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete sales order?</h3><p>{fieldSettings.find((field) => field.key === "orderNo")?.label ?? "Order No"}: {values.orderNo}</p><p>{fieldSettings.find((field) => field.key === "customer")?.label ?? "Customer"}: {values.customer}</p><p>{fieldSettings.find((field) => field.key === "status")?.label ?? "Status"}: {values.status}</p><div className="form-actions"><a className="primary-button destructive-button" href="/sales-orders">Confirm Delete</a><a className="secondary-button" href="/sales-orders">Cancel</a></div><p className="feedback">Screen flow is ready. Database posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              {fieldSettings.map((field) => {
                if (!field.visible) {
                  return <input key={field.key} type="hidden" name={field.key} value={mode === "copy" && field.key === "orderNo" ? "" : values[field.key] ?? ""} readOnly />;
                }

                return (
                  <label key={field.key}>
                    {field.label}
                    <input defaultValue={mode === "copy" && field.key === "orderNo" ? "" : values[field.key] ?? ""} readOnly={mode === "change" && field.key === "orderNo"} required={field.required} />
                  </label>
                );
              })}
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/sales-orders">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Database posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
