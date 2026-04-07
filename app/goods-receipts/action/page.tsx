import { receipts } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function GoodsReceiptActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = receipts.find((receipt) => receipt.receiptNo === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Goods Receipt</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Goods Receipt</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new goods receipt record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete goods receipt?</h3><p>Receipt No: {current?.receiptNo ?? ""}</p><p>Supplier: {current?.supplier ?? ""}</p><p>Item Code: {current?.itemCode ?? ""}</p><div className="form-actions"><a className="primary-button destructive-button" href="/goods-receipts">Confirm Delete</a><a className="secondary-button" href="/goods-receipts">Cancel</a></div><p className="feedback">Screen flow is ready. Database posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              <label>Receipt No<input defaultValue={mode === "copy" ? "" : current?.receiptNo ?? ""} readOnly={mode === "change"} /></label>
              <label>Supplier<input defaultValue={current?.supplier ?? ""} /></label>
              <label>Item Code<input defaultValue={current?.itemCode ?? ""} /></label>
              <label>Quantity<input defaultValue={current?.quantity ?? ""} /></label>
              <label>Location<input defaultValue={current?.location ?? ""} /></label>
              <label>Status<input defaultValue={current?.status ?? ""} /></label>
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/goods-receipts">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Database posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
