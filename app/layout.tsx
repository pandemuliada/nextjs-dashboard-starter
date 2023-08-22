import SidebarMenu from "@/components/SidebarMenu";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dashboard } from "@/layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashco.",
  description: "A nextjs dashboard starter by @pandemuliada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Dashboard>{children}</Dashboard>
      </body>
    </html>
  );
}
