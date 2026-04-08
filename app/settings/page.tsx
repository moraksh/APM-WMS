import Link from "next/link";
import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { processLabels, type ProcessKey } from "@/lib/process-field-settings";
import { saveFieldSettingsAction } from "./actions";
import { SettingsForm } from "./settings-form";

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
        <SettingsForm
          process={activeProcess}
          fields={fields}
          message={params.message}
          state={params.state}
          action={saveFieldSettingsAction}
        />
      </section>
    </main>
  );
}
