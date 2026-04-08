import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { inventory } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function InventoryActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = inventory.find((row) => `${row.itemCode}-${row.location}` === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);
  const fieldSettings = await getProcessFieldSettings("inventory");
  const values: Record<string, string> = {
    itemCode: current?.itemCode ?? "",
    description: current?.description ?? "",
    location: current?.location ?? "",
    onHand: current ? String(current.onHand) : "",
    allocated: current ? String(current.allocated) : "",
    available: current ? String(current.available) : "",
  };

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Inventory</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Inventory</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new inventory record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete inventory record?</h3><p>{fieldSettings.find((field) => field.key === "itemCode")?.label ?? "Item Code"}: {values.itemCode}</p><p>{fieldSettings.find((field) => field.key === "description")?.label ?? "Description"}: {values.description}</p><p>{fieldSettings.find((field) => field.key === "location")?.label ?? "Location"}: {values.location}</p><div className="form-actions"><a className="primary-button destructive-button" href="/inventory">Confirm Delete</a><a className="secondary-button" href="/inventory">Cancel</a></div><p className="feedback">Screen flow is ready. Inventory posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              {fieldSettings.map((field) => {
                if (!field.visible) {
                  return <input key={field.key} type="hidden" name={field.key} value={mode === "copy" && field.key === "itemCode" ? "" : values[field.key] ?? ""} readOnly />;
                }

                return (
                  <label key={field.key}>
                    {field.label}
                    <input defaultValue={mode === "copy" && field.key === "itemCode" ? "" : values[field.key] ?? ""} readOnly={mode === "change" && field.key === "itemCode"} required={field.required} />
                  </label>
                );
              })}
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/inventory">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Inventory posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
