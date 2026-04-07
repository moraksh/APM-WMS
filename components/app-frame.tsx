"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function AppFrame({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`app-shell ${menuOpen ? "menu-open" : ""}`}>
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)} />
      <div className="content-shell">
        <Topbar onMenuToggle={() => setMenuOpen((current) => !current)} />
        {children}
      </div>
      {menuOpen ? <button className="menu-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} /> : null}
    </div>
  );
}
