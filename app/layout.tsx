import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviewTap",
  description: "Customer feedback and review engagement for local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
