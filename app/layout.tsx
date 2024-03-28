import '@/app/(ui)/globals.css';
import {Metadata} from "next";
import React from "react";
import {inter} from "@/app/(ui)/fonts";
import {Toaster} from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: '%s | UZ Dashboard',
    default: 'Uz Dashboard',
  },
  description: 'Admin panel for Uzworks.uz website.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiased`}>
     <main>{children}</main>
    <Toaster richColors />
    </body>
    </html>
  );
}