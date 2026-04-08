export type NavItem = { href: string; label: string; caption: string };
export type Kpi = { label: string; value: string; note: string };
export type Item = Record<string, string> & { warehouse: string; company: string; item_number: string; item_description_1: string };
export type Receipt = { receiptNo: string; supplier: string; itemCode: string; quantity: number; location: string; status: string };
export type InventoryRow = { itemCode: string; description: string; location: string; onHand: number; allocated: number; available: number };
export type Location = { code: string; zone: string; aisle: string; bin: string; capacity: string; status: string };
export type SalesOrder = { orderNo: string; customer: string; orderDate: string; items: number; shipFrom: string; status: string };
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
  { warehouse: "DXB1", company: "APM", item_number: "ITM-1001", item_description_1: "Industrial Tape 48mm" },
  { warehouse: "DXB1", company: "APM", item_number: "ITM-1002", item_description_1: "Barcode Scanner X2" },
  { warehouse: "DXB2", company: "APM", item_number: "ITM-1003", item_description_1: "Safety Gloves Large" }
];
export const receipts: Receipt[] = [
  { receiptNo: "GRN-2026-041", supplier: "Nexa Supplies", itemCode: "ITM-1001", quantity: 240, location: "RCV-01", status: "Received" }
];
export const inventory: InventoryRow[] = [
  { itemCode: "ITM-1001", description: "Industrial Tape 48mm", location: "A-01-01", onHand: 460, allocated: 80, available: 380 }
];
export const locations: Location[] = [
  { code: "A-01-01", zone: "Fast Pick", aisle: "A01", bin: "01", capacity: "500 units", status: "Available" }
];
export const salesOrders: SalesOrder[] = [
  { orderNo: "SO-2026-318", customer: "Al Maha Retail", orderDate: "2026-04-07", items: 6, shipFrom: "A-01", status: "Picking" }
];
export const quickActions = [
  { title: "Receive stock", href: "/goods-receipts", tone: "orange" },
  { title: "Review item master", href: "/items", tone: "blue" },
  { title: "Check inventory", href: "/inventory", tone: "green" },
  { title: "Release orders", href: "/sales-orders", tone: "purple" }
];
export const recentActivities = [
  { title: "Goods receipt posted", detail: "GRN-2026-043 moved 150 units into receiving.", time: "18 min ago" }
];

