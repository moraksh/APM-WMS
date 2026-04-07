"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type BrowserColumn = {
  key: string;
  label: string;
};

export type BrowserRow = {
  id: string;
  values: Record<string, string>;
};

export function RecordBrowser({
  title,
  basePath,
  columns,
  rows,
  message,
  messageState,
}: {
  title: string;
  basePath: string;
  columns: BrowserColumn[];
  rows: BrowserRow[];
  message?: string;
  messageState?: "success" | "error";
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return columns.every((column) => {
        const filterValue = (filters[column.key] ?? "").trim().toLowerCase();

        if (!filterValue) {
          return true;
        }

        return (row.values[column.key] ?? "").toLowerCase().includes(filterValue);
      });
    });
  }, [columns, filters, rows]);

  function toggleSelection(id: string) {
    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((entry) => entry !== id);
      }

      return [...current, id];
    });
  }

  function toggleAll() {
    const allIds = filteredRows.map((row) => row.id);
    const allSelected = allIds.length > 0 && allIds.every((id) => selected.includes(id));

    if (allSelected) {
      setSelected((current) => current.filter((id) => !allIds.includes(id)));
      return;
    }

    setSelected((current) => Array.from(new Set([...current, ...allIds])));
  }

  function openAction(mode: "create" | "copy" | "change" | "delete") {
    if (mode === "create") {
      router.push(`${basePath}/action?mode=create`);
      return;
    }

    if (selected.length === 0) {
      return;
    }

    router.push(`${basePath}/action?mode=${mode}&ids=${encodeURIComponent(selected.join(","))}`);
  }

  const allVisibleSelected = filteredRows.length > 0 && filteredRows.every((row) => selected.includes(row.id));

  return (
    <main className="page-shell">
      <section className="section-card module-toolbar-card">
        <div className="module-toolbar-head module-toolbar-stack">
          <div className="module-inline-title">{title}</div>
          <div className="action-toolbar action-toolbar-tight">
            <button className="primary-button" type="button" onClick={() => openAction("create")}>
              Create
            </button>
            <button className="secondary-button" type="button" onClick={() => openAction("copy")} disabled={selected.length === 0}>
              Copy
            </button>
            <button className="secondary-button" type="button" onClick={() => openAction("change")} disabled={selected.length === 0}>
              Change
            </button>
            <button className="secondary-button" type="button" onClick={() => openAction("delete")} disabled={selected.length === 0}>
              Delete
            </button>
          </div>
        </div>
        {message ? <p className={messageState === "error" ? "feedback error" : "feedback success"}>{message}</p> : null}
      </section>

      <section className="section-card record-list-card">
        <div className="mobile-filter-grid">
          {columns.map((column) => (
            <label key={column.key} className="mobile-filter-field">
              <span>{column.label}</span>
              <input
                value={filters[column.key] ?? ""}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    [column.key]: event.target.value,
                  }))
                }
                placeholder={`Filter ${column.label}`}
              />
            </label>
          ))}
        </div>

        <div className="mobile-select-all">
          <label>
            <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} />
            <span>Select all visible records</span>
          </label>
        </div>

        <div className="table-wrap desktop-records">
          <table className="data-table selection-table compact-data-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all visible rows" />
                </th>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
              <tr className="filter-row">
                <th />
                {columns.map((column) => (
                  <th key={column.key}>
                    <input
                      value={filters[column.key] ?? ""}
                      onChange={(event) =>
                        setFilters((current) => ({
                          ...current,
                          [column.key]: event.target.value,
                        }))
                      }
                      placeholder={`Filter ${column.label}`}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleSelection(row.id)}
                      aria-label={`Select ${row.id}`}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.key}>{row.values[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-record-list">
          {filteredRows.map((row) => (
            <article key={row.id} className="mobile-record-card">
              <div className="mobile-record-head">
                <label className="mobile-record-check">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelection(row.id)}
                    aria-label={`Select ${row.id}`}
                  />
                  <span>{row.values[columns[0]?.key] ?? row.id}</span>
                </label>
              </div>
              <div className="mobile-record-body">
                {columns.map((column) => (
                  <div key={column.key} className="mobile-record-row">
                    <span>{column.label}</span>
                    <strong>{row.values[column.key]}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
