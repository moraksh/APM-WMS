import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { receipts } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function GoodsReceiptActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = receipts.find((receipt) => receipt.receiptNo === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);
  const fieldSettings = await getProcessFieldSettings("goods_receipts");
  const values: Record<string, string> = {
    receiptNo: current?.receiptNo ?? "",
    supplier: current?.supplier ?? "",
    itemCode: current?.itemCode ?? "",
    quantity: current ? String(current.quantity) : "",
    location: current?.location ?? "",
    status: current?.status ?? "",
  };

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Goods Receipt</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Goods Receipt</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new goods receipt record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete goods receipt?</h3><p>{fieldSettings.find((field) => field.key === "receiptNo")?.label ?? "Receipt No"}: {values.receiptNo}</p><p>{fieldSettings.find((field) => field.key === "supplier")?.label ?? "Supplier"}: {values.supplier}</p><p>{fieldSettings.find((field) => field.key === "itemCode")?.label ?? "Item Code"}: {values.itemCode}</p><div className="form-actions"><a className="primary-button destructive-button" href="/goods-receipts">Confirm Delete</a><a className="secondary-button" href="/goods-receipts">Cancel</a></div><p className="feedback">Screen flow is ready. Database posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              {fieldSettings.map((field) => {
                if (!field.visible) {
                  return <input key={field.key} type="hidden" name={field.key} value={mode === "copy" && field.key === "receiptNo" ? "" : values[field.key] ?? ""} readOnly />;
                }

                return (
                  <label key={field.key}>
                    {field.label}
                    <input defaultValue={mode === "copy" && field.key === "receiptNo" ? "" : values[field.key] ?? ""} readOnly={mode === "change" && field.key === "receiptNo"} required={field.required} />
                  </label>
                );
              })}
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/goods-receipts">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Database posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
