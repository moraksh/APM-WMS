import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { locations } from "@/lib/mock-data";

type Params = { mode?: string; ids?: string };

export default async function LocationsActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const current = locations.find((location) => location.code === ids[0]);
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);
  const fieldSettings = await getProcessFieldSettings("locations");
  const values: Record<string, string> = {
    code: current?.code ?? "",
    zone: current?.zone ?? "",
    aisle: current?.aisle ?? "",
    bin: current?.bin ?? "",
    capacity: current?.capacity ?? "",
    status: current?.status ?? "",
  };

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header"><span className="brand-tag">Location Master</span></section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Location</h2>
          {ids.length > 0 ? <p>{ids.length} record(s) selected. Processing the first record on this screen.</p> : <p>Create a new location record.</p>}
        </div>
        {mode === "delete" ? (
          <div className="modal-backdrop-static"><div className="confirm-dialog"><h3>Delete location?</h3><p>{fieldSettings.find((field) => field.key === "code")?.label ?? "Code"}: {values.code}</p><p>{fieldSettings.find((field) => field.key === "zone")?.label ?? "Zone"}: {values.zone}</p><p>{fieldSettings.find((field) => field.key === "aisle")?.label ?? "Aisle"}: {values.aisle}</p><div className="form-actions"><a className="primary-button destructive-button" href="/locations">Confirm Delete</a><a className="secondary-button" href="/locations">Cancel</a></div><p className="feedback">Screen flow is ready. Database posting can be connected next.</p></div></div>
        ) : (
          <>
            <form className="form-grid">
              {fieldSettings.map((field) => {
                if (!field.visible) {
                  return <input key={field.key} type="hidden" name={field.key} value={mode === "copy" && field.key === "code" ? "" : values[field.key] ?? ""} readOnly />;
                }

                return (
                  <label key={field.key}>
                    {field.label}
                    <input defaultValue={mode === "copy" && field.key === "code" ? "" : values[field.key] ?? ""} readOnly={mode === "change" && field.key === "code"} required={field.required} />
                  </label>
                );
              })}
              <div className="form-actions form-actions-span"><button className="primary-button" type="button">{title}</button><a className="secondary-button" href="/locations">Back</a></div>
            </form>
            <p className="feedback">Screen flow is ready. Database posting can be connected next.</p>
          </>
        )}
      </section>
    </main>
  );
}
