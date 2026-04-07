import Link from "next/link";
import { navigation } from "@/lib/mock-data";

export function Sidebar() {
  return (
    <aside className="sidebar-shell" aria-label="Primary navigation">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">A</div>
        <div>
          <strong>APM-WMS</strong>
          <span>Warehouse Suite</span>
        </div>
      </div>

      <div className="sidebar-section-label">Menu</div>

      <nav className="nav-list" aria-label="Primary">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            <strong>{item.label}</strong>
            <span>{item.caption}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
