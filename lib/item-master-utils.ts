export function getItemIdentityKey(values: { warehouse: string; company: string; item_number: string }) {
  return [values.warehouse, values.company, values.item_number].join("||");
}
