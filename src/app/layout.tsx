import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Eshop | code:Alex",
    default: "Home - Eshop | code:Alex",
  },
  description: "Eshop by code:Alex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
