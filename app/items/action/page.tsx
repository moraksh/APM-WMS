import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { itemMasterUniqueKeys } from "@/lib/item-master-fields";
import { getItemIdentityKey } from "@/lib/item-master-utils";
import { createItemAction, deleteItemAction, getSelectedItems, updateItemAction } from "../actions";

type Params = { mode?: string; ids?: string };

export default async function ItemActionPage({ searchParams }: { searchParams?: Promise<Params> }) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  const selectedItems = await getSelectedItems(ids);
  const currentItem = selectedItems[0];
  const nextIds = selectedItems.slice(1).map((item) => getItemIdentityKey(item)).join(",");
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);
  const createLike = mode === "create" || mode === "copy";
  const fieldSettings = await getProcessFieldSettings("items");

  return (
    <main className="page-shell action-screen-shell">
      <section className="page-header compact-header">
        <span className="brand-tag">Item Master</span>
      </section>
      <section className="section-card action-screen-card">
        <div className="section-header">
          <h2>{title} Item</h2>
          {selectedItems.length > 0 ? <p>{selectedItems.length} item(s) selected. Processing the current record first.</p> : null}
        </div>
        {mode === "delete" ? (
          currentItem ? (
            <div className="modal-backdrop-static">
              <div className="confirm-dialog">
                <h3>Delete item?</h3>
                <p>{fieldSettings.find((field) => field.key === "warehouse")?.label ?? "Warehouse"}: {currentItem.warehouse}</p>
                <p>{fieldSettings.find((field) => field.key === "company")?.label ?? "Company"}: {currentItem.company}</p>
                <p>{fieldSettings.find((field) => field.key === "item_number")?.label ?? "Item Number"}: {currentItem.item_number}</p>
                <p>{fieldSettings.find((field) => field.key === "item_description_1")?.label ?? "Item Description 1"}: {currentItem.item_description_1}</p>
                <form action={deleteItemAction} className="form-actions">
                  <input type="hidden" name="identity" value={getItemIdentityKey(currentItem)} />
                  <input type="hidden" name="nextIds" value={nextIds} />
                  <button className="primary-button destructive-button" type="submit">Confirm Delete</button>
                  <a className="secondary-button" href="/items">Cancel</a>
                </form>
              </div>
            </div>
          ) : (
            <p className="feedback error">Select one or more items on the Item Master list before using Delete.</p>
          )
        ) : (
          <form className="form-grid" action={createLike ? createItemAction : updateItemAction}>
            <input type="hidden" name="nextIds" value={nextIds} />
            {!createLike && currentItem ? <input type="hidden" name="originalIdentity" value={getItemIdentityKey(currentItem)} /> : null}
            {fieldSettings.map((field) => {
              const readOnly = mode === "change" && itemMasterUniqueKeys.includes(field.key as (typeof itemMasterUniqueKeys)[number]);
              const defaultValue = mode === "copy" && field.key === "item_number" ? "" : currentItem?.[field.key] ?? "";

              if (!field.visible) {
                return <input key={field.key} type="hidden" name={field.key} value={defaultValue} readOnly />;
              }

              return (
                <label key={field.key}>
                  {field.label}
                  <input name={field.key} defaultValue={defaultValue} readOnly={readOnly} required={field.required} />
                </label>
              );
            })}
            <div className="form-actions form-actions-span">
              <button className="primary-button" type="submit">{title}</button>
              <a className="secondary-button" href="/items">Back</a>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}

