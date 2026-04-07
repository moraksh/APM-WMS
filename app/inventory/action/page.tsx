import { inventory } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function InventoryActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = inventory.find((row) => `${row.itemCode}-${row.location}` === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Inventory</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Inventory</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new inventory record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete inventory record?</h3><p>Item Code: {current?.itemCode ?? ""}</p><p>Description: {current?.description ?? ""}</p><p>Location: {current?.location ?? ""}</p><div className="form-actions"><a className="primary-button destructive-button" href="/inventory">Confirm Delete</a><a className="secondary-button" href="/inventory">Cancel</a></div><p className="feedback">Screen flow is ready. Inventory posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              <label>Item Code<input defaultValue={mode === "copy" ? "" : current?.itemCode ?? ""} readOnly={mode === "change"} /></label>
              <label>Description<input defaultValue={current?.description ?? ""} /></label>
              <label>Location<input defaultValue={current?.location ?? ""} /></label>
              <label>On Hand<input defaultValue={current?.onHand ?? ""} /></label>
              <label>Allocated<input defaultValue={current?.allocated ?? ""} /></label>
              <label>Available<input defaultValue={current?.available ?? ""} /></label>
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/inventory">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Inventory posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
