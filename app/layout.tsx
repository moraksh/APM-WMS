import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export const metadata: Metadata = {
  title: "APM-WMS",
  description: "APM-WMS warehouse management software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Sidebar />
          <div className="content-shell">
            <Topbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
