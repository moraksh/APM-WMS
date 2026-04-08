import { itemMasterFields } from "@/lib/item-master-fields";

export type ProcessKey = "items" | "goods_receipts" | "inventory" | "locations" | "sales_orders";

export type ProcessFieldDefinition = {
  key: string;
  label: string;
  visible: boolean;
  required: boolean;
};

export const processLabels: Record<ProcessKey, string> = {
  items: "Item Master",
  goods_receipts: "Goods Receipt",
  inventory: "Inventory",
  locations: "Location Master",
  sales_orders: "Sales Orders",
};

export const processFieldDefinitions: Record<ProcessKey, ProcessFieldDefinition[]> = {
  items: itemMasterFields.map((field) => ({
    key: field.key,
    label: field.label,
    visible: true,
    required: field.required,
  })),
  goods_receipts: [
    { key: "receiptNo", label: "Receipt No", visible: true, required: true },
    { key: "supplier", label: "Supplier", visible: true, required: true },
    { key: "itemCode", label: "Item Code", visible: true, required: true },
    { key: "quantity", label: "Quantity", visible: true, required: true },
    { key: "location", label: "Location", visible: true, required: true },
    { key: "status", label: "Status", visible: true, required: false },
  ],
  inventory: [
    { key: "itemCode", label: "Item Code", visible: true, required: true },
    { key: "description", label: "Description", visible: true, required: false },
    { key: "location", label: "Location", visible: true, required: true },
    { key: "onHand", label: "On Hand", visible: true, required: false },
    { key: "allocated", label: "Allocated", visible: true, required: false },
    { key: "available", label: "Available", visible: true, required: false },
  ],
  locations: [
    { key: "code", label: "Code", visible: true, required: true },
    { key: "zone", label: "Zone", visible: true, required: true },
    { key: "aisle", label: "Aisle", visible: true, required: false },
    { key: "bin", label: "Bin", visible: true, required: false },
    { key: "capacity", label: "Capacity", visible: true, required: false },
    { key: "status", label: "Status", visible: true, required: false },
  ],
  sales_orders: [
    { key: "orderNo", label: "Order No", visible: true, required: true },
    { key: "customer", label: "Customer", visible: true, required: true },
    { key: "orderDate", label: "Order Date", visible: true, required: true },
    { key: "items", label: "Items", visible: true, required: false },
    { key: "shipFrom", label: "Ship From", visible: true, required: false },
    { key: "status", label: "Status", visible: true, required: false },
  ],
};

export const itemIdentityKeys = ["warehouse", "company", "item_number"] as const;
