import SidebarMenu from "@/components/SidebarMenu";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <div className="max-w-[1600px] mx-auto">
          <SidebarMenu />

          <div className="ml-[250px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
