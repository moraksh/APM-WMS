import Link from "next/link";
import { navigation } from "@/lib/mock-data";

export function Sidebar({
  open,
  onNavigate,
  onClose,
}: {
  open: boolean;
  onNavigate: () => void;
  onClose: () => void;
}) {
  return (
    <aside className={`sidebar-shell ${open ? "open" : ""}`} aria-label="Primary navigation">
      <div className="sidebar-header-row">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">A</div>
          <div>
            <strong>APM-WMS</strong>
            <span>Warehouse Suite</span>
          </div>
        </div>
        <button className="sidebar-close-button" type="button" onClick={onClose} aria-label="Close menu">
          x
        </button>
      </div>

      <div className="sidebar-section-label">Menu</div>

      <nav className="nav-list" aria-label="Primary">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link" onClick={onNavigate}>
            <strong>{item.label}</strong>
            <span>{item.caption}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
