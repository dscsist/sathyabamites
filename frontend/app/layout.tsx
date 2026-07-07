import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sathyabamites Dashboard",
  description: "Student community dashboard for Sathyabamites"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
