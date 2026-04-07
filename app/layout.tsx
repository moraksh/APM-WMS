import type { Metadata } from "next";
import "./globals.css";
import { AppFrame } from "@/components/app-frame";

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
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
