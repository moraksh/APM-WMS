import { salesOrders } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function SalesOrdersActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = salesOrders.find((order) => order.orderNo === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Sales Orders</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Sales Order</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new sales order record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete sales order?</h3><p>Order No: {current?.orderNo ?? ""}</p><p>Customer: {current?.customer ?? ""}</p><p>Status: {current?.status ?? ""}</p><div className="form-actions"><a className="primary-button destructive-button" href="/sales-orders">Confirm Delete</a><a className="secondary-button" href="/sales-orders">Cancel</a></div><p className="feedback">Screen flow is ready. Database posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              <label>Order No<input defaultValue={mode === "copy" ? "" : current?.orderNo ?? ""} readOnly={mode === "change"} /></label>
              <label>Customer<input defaultValue={current?.customer ?? ""} /></label>
              <label>Order Date<input defaultValue={current?.orderDate ?? ""} /></label>
              <label>Items<input defaultValue={current?.items ?? ""} /></label>
              <label>Ship From<input defaultValue={current?.shipFrom ?? ""} /></label>
              <label>Status<input defaultValue={current?.status ?? ""} /></label>
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/sales-orders">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Database posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
