import { locations } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function LocationsActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = locations.find((location) => location.code === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Location Master</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Location</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new location record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete location?</h3><p>Code: {current?.code ?? ""}</p><p>Zone: {current?.zone ?? ""}</p><p>Aisle: {current?.aisle ?? ""}</p><div className="form-actions"><a className="primary-button destructive-button" href="/locations">Confirm Delete</a><a className="secondary-button" href="/locations">Cancel</a></div><p className="feedback">Screen flow is ready. Database posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              <label>Code<input defaultValue={mode === "copy" ? "" : current?.code ?? ""} readOnly={mode === "change"} /></label>
              <label>Zone<input defaultValue={current?.zone ?? ""} /></label>
              <label>Aisle<input defaultValue={current?.aisle ?? ""} /></label>
              <label>Bin<input defaultValue={current?.bin ?? ""} /></label>
              <label>Capacity<input defaultValue={current?.capacity ?? ""} /></label>
              <label>Status<input defaultValue={current?.status ?? ""} /></label>
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/locations">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Database posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
