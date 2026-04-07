import { createItemAction, deleteItemAction, getSelectedItems, updateItemAction } from "../actions";

type Params = {
  mode?: string;
  ids?: string;
};

export default async function ItemActionPage({
  searchParams,
}: {
  searchParams?: Promise<Params>;
}) {
  const params = (await searchParams) ?? {};
  const mode = params.mode ?? "create";
  const ids = (params.ids ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const selectedItems = await getSelectedItems(ids);
  const currentItem = selectedItems[0];
  const nextIds = selectedItems.slice(1).map((item) => item.itemCode).join(",");
  const title = mode.charAt(0).toUpperCase() + mode.slice(1);
  const createLike = mode === "create" || mode === "copy";

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
                <p>Item Code: {currentItem.itemCode}</p>
                <p>Description: {currentItem.description}</p>
                <p>Category: {currentItem.category}</p>
                <form action={deleteItemAction} className="form-actions">
                  <input type="hidden" name="itemCode" value={currentItem.itemCode} />
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
            <input type="hidden" name="nextIds" value={mode === "copy" ? nextIds : nextIds} />
            {!createLike ? <input type="hidden" name="originalItemCode" value={currentItem?.itemCode ?? ""} /> : null}
            <label>
              Item Code
              <input
                name="itemCode"
                defaultValue={mode === "copy" ? "" : currentItem?.itemCode ?? ""}
                placeholder={mode === "copy" ? "Enter new item code" : "Enter item code"}
                readOnly={mode === "change"}
                required
              />
            </label>
            <label>
              Description
              <input name="description" defaultValue={currentItem?.description ?? ""} required />
            </label>
            <label>
              Category
              <select name="category" defaultValue={currentItem?.category ?? "Packing"}>
                <option>Packing</option>
                <option>Devices</option>
                <option>Consumables</option>
                <option>Safety</option>
              </select>
            </label>
            <label>
              Unit
              <input name="unit" defaultValue={currentItem?.unit ?? "Each"} required />
            </label>
            <label>
              Reorder Level
              <input name="reorderLevel" type="number" min="0" defaultValue={currentItem?.reorderLevel ?? 0} required />
            </label>
            <label>
              Status
              <select name="status" defaultValue={currentItem?.status ?? "Active"}>
                <option>Active</option>
                <option>Inactive</option>
                <option>Blocked</option>
                <option>Low Stock</option>
              </select>
            </label>
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
