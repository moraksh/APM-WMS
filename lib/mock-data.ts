export type NavItem = {
  href: string;
  label: string;
  caption: string;
};

export type Kpi = {
  label: string;
  value: string;
  note: string;
};

export type Item = {
  itemCode: string;
  description: string;
  category: string;
  unit: string;
  reorderLevel: number;
  status: string;
};

export type Receipt = {
  receiptNo: string;
  supplier: string;
  itemCode: string;
  quantity: number;
  location: string;
  status: string;
};

export type InventoryRow = {
  itemCode: string;
  description: string;
  location: string;
  onHand: number;
  allocated: number;
  available: number;
};

export type Location = {
  code: string;
  zone: string;
  aisle: string;
  bin: string;
  capacity: string;
  status: string;
};

export type SalesOrder = {
  orderNo: string;
  customer: string;
  orderDate: string;
  items: number;
  shipFrom: string;
  status: string;
};

export const navigation: NavItem[] = [
  { href: "/", label: "Dashboard", caption: "Operations overview" },
  { href: "/items", label: "Item Master", caption: "Products and SKU setup" },
  { href: "/goods-receipts", label: "Goods Receipt", caption: "Inbound receipt workflow" },
  { href: "/inventory", label: "Inventory", caption: "Current stock visibility" },
  { href: "/locations", label: "Location Master", caption: "Warehouse bins and zones" },
  { href: "/sales-orders", label: "Sales Orders", caption: "Outbound order processing" },
  { href: "/reports", label: "Reports", caption: "Inventory and dispatch trends" },
  { href: "/users", label: "Users", caption: "Roles and access control" },
  { href: "/settings", label: "Settings", caption: "System preferences" }
];

export const dashboardKpis: Kpi[] = [
  { label: "Open receipts", value: "14", note: "6 waiting for quality check" },
  { label: "Available inventory", value: "18,420", note: "Across 126 active SKUs" },
  { label: "Pending sales orders", value: "29", note: "11 due for dispatch today" },
  { label: "Active locations", value: "248", note: "14 bins blocked for audit" }
];

export const items: Item[] = [
  { itemCode: "ITM-1001", description: "Industrial Tape 48mm", category: "Packing", unit: "Roll", reorderLevel: 120, status: "Active" },
  { itemCode: "ITM-1002", description: "Barcode Scanner X2", category: "Devices", unit: "Each", reorderLevel: 25, status: "Active" },
  { itemCode: "ITM-1003", description: "Safety Gloves Large", category: "Safety", unit: "Pair", reorderLevel: 80, status: "Low Stock" },
  { itemCode: "ITM-1004", description: "Shipping Label 4x6", category: "Consumables", unit: "Pack", reorderLevel: 60, status: "Active" }
];

export const receipts: Receipt[] = [
  { receiptNo: "GRN-2026-041", supplier: "Nexa Supplies", itemCode: "ITM-1001", quantity: 240, location: "RCV-01", status: "Received" },
  { receiptNo: "GRN-2026-042", supplier: "Blue Orbit Tech", itemCode: "ITM-1002", quantity: 20, location: "QC-02", status: "Quality Check" },
  { receiptNo: "GRN-2026-043", supplier: "Prime Safety", itemCode: "ITM-1003", quantity: 150, location: "PUT-07", status: "Putaway Pending" }
];

export const inventory: InventoryRow[] = [
  { itemCode: "ITM-1001", description: "Industrial Tape 48mm", location: "A-01-01", onHand: 460, allocated: 80, available: 380 },
  { itemCode: "ITM-1002", description: "Barcode Scanner X2", location: "B-02-04", onHand: 44, allocated: 12, available: 32 },
  { itemCode: "ITM-1003", description: "Safety Gloves Large", location: "C-03-02", onHand: 96, allocated: 20, available: 76 },
  { itemCode: "ITM-1004", description: "Shipping Label 4x6", location: "A-04-03", onHand: 310, allocated: 55, available: 255 }
];

export const locations: Location[] = [
  { code: "A-01-01", zone: "Fast Pick", aisle: "A01", bin: "01", capacity: "500 units", status: "Available" },
  { code: "B-02-04", zone: "Electronics", aisle: "B02", bin: "04", capacity: "100 units", status: "Available" },
  { code: "QC-02", zone: "Quality Check", aisle: "QC", bin: "02", capacity: "60 units", status: "Inspection" },
  { code: "RCV-01", zone: "Receiving", aisle: "RCV", bin: "01", capacity: "2 pallets", status: "Inbound" }
];

export const salesOrders: SalesOrder[] = [
  { orderNo: "SO-2026-318", customer: "Al Maha Retail", orderDate: "2026-04-07", items: 6, shipFrom: "A-01", status: "Picking" },
  { orderNo: "SO-2026-319", customer: "Desert Trade LLC", orderDate: "2026-04-07", items: 3, shipFrom: "B-02", status: "Packed" },
  { orderNo: "SO-2026-320", customer: "North Bay Stores", orderDate: "2026-04-08", items: 8, shipFrom: "Mixed", status: "Allocated" }
];

export const quickActions = [
  { title: "Receive stock", href: "/goods-receipts", tone: "orange" },
  { title: "Review item master", href: "/items", tone: "blue" },
  { title: "Check inventory", href: "/inventory", tone: "green" },
  { title: "Release orders", href: "/sales-orders", tone: "purple" }
];

export const recentActivities = [
  { title: "Goods receipt posted", detail: "GRN-2026-043 moved 150 units into receiving.", time: "18 min ago" },
  { title: "Cycle count flagged", detail: "QC-02 requires recount for two active SKUs.", time: "42 min ago" },
  { title: "Sales order packed", detail: "SO-2026-319 is ready for dispatch confirmation.", time: "1 hr ago" },
  { title: "Location blocked", detail: "A-01-09 is temporarily unavailable for replenishment.", time: "2 hr ago" }
];
