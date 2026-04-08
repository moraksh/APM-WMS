"use client";

import { useMemo, useState } from "react";
import type { ProcessFieldSetting } from "@/lib/field-settings-service";
import type { ProcessKey } from "@/lib/process-field-settings";

export function SettingsForm({
  process,
  fields,
  message,
  state,
  action,
}: {
  process: ProcessKey;
  fields: ProcessFieldSetting[];
  message?: string;
  state?: "success" | "error";
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [query, setQuery] = useState("");

  const filteredFields = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return fields;
    }

    return fields.filter((field) => {
      return (
        field.key.toLowerCase().includes(normalized) ||
        field.label.toLowerCase().includes(normalized)
      );
    });
  }, [fields, query]);

  return (
    <form action={action} className="settings-form-grid">
      <input type="hidden" name="process" value={process} />
      <div className="settings-search-row">
        <div className="settings-search-box">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search field key or displayed name"
            aria-label="Search fields"
          />
        </div>
        <div className="settings-result-note">{filteredFields.length} field(s)</div>
      </div>
      {message ? <p className={state === "error" ? "feedback error" : "feedback success"}>{message}</p> : null}
      <div className="settings-header-row">
        <strong>Screen field</strong>
        <strong>Show</strong>
        <strong>Displayed name</strong>
        <strong>Mandatory</strong>
      </div>
      {fields.map((field) => {
        const visibleInFilter = filteredFields.some((entry) => entry.key === field.key);

        return (
          <div key={field.key} className={`settings-row ${visibleInFilter ? "" : "settings-row-hidden"}`}>
            <div className="settings-field-name">{field.key}</div>
            <label className="settings-check-cell">
              <input type="checkbox" name={`visible_${field.key}`} defaultChecked={field.visible} />
            </label>
            <input name={`label_${field.key}`} defaultValue={field.label} className="settings-label-input" />
            <label className="settings-check-cell">
              <input type="checkbox" name={`required_${field.key}`} defaultChecked={field.required} />
            </label>
          </div>
        );
      })}
      <div className="form-actions form-actions-span">
        <button className="primary-button" type="submit">Save Settings</button>
      </div>
    </form>
  );
}
