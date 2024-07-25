import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import 'animate.css';
import Providers from "../redux/hooks/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "My Todo List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased w-full flex",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="w-1/5 min-h-screen bg-main border-r-2"></div>
          <div className="w-4/5 min-h-screen ">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
