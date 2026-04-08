import Link from "next/link";
import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { processLabels, type ProcessKey } from "@/lib/process-field-settings";
import { saveFieldSettingsAction } from "./actions";

type Params = {
  process?: string;
  message?: string;
  state?: "success" | "error";
};

const processes = Object.keys(processLabels) as ProcessKey[];

export default async function SettingsPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const activeProcess = processes.includes((params.process ?? "") as ProcessKey)
    ? ((params.process ?? "") as ProcessKey)
    : "items";
  const fields = await getProcessFieldSettings(activeProcess);

  return (
    <main className="page-shell">
      <section className="section-card">
        <div className="section-header">
          <h2>Settings</h2>
          <p>Choose which fields users maintain in each process, what label appears on screen, and whether the field is mandatory.</p>
        </div>
        <div className="action-toolbar">
          {processes.map((process) => (
            <Link
              key={process}
              href={`/settings?process=${process}`}
              className={`action-link ${process === activeProcess ? "active" : ""}`}
            >
              {processLabels[process]}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2>{processLabels[activeProcess]} Field Control</h2>
          <p>Visible fields appear on create and change screens. Mandatory fields are validated when users save.</p>
        </div>
        {params.message ? <p className={params.state === "error" ? "feedback error" : "feedback success"}>{params.message}</p> : null}
        <form action={saveFieldSettingsAction} className="settings-form-grid">
          <input type="hidden" name="process" value={activeProcess} />
          <div className="settings-header-row">
            <strong>Screen field</strong>
            <strong>Show</strong>
            <strong>Displayed name</strong>
            <strong>Mandatory</strong>
          </div>
          {fields.map((field) => (
            <div key={field.key} className="settings-row">
              <div className="settings-field-name">{field.key}</div>
              <label className="settings-check-cell">
                <input type="checkbox" name={`visible_${field.key}`} defaultChecked={field.visible} />
              </label>
              <input name={`label_${field.key}`} defaultValue={field.label} className="settings-label-input" />
              <label className="settings-check-cell">
                <input type="checkbox" name={`required_${field.key}`} defaultChecked={field.required} />
              </label>
            </div>
          ))}
          <div className="form-actions form-actions-span">
            <button className="primary-button" type="submit">Save Settings</button>
          </div>
        </form>
      </section>
    </main>
  );
}
