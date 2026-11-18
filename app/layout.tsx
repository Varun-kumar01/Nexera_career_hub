import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexera Career Hub",
  description:
    "Career management, application support and interview preparation for students and professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#F7F8FC] text-[#111827]">{children}</body>
    </html>
  );
}
