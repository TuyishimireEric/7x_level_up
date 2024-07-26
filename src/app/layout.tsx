import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/database/utils";
import "animate.css";
import Login from "@/src/components/login-btn";
import Providers from "../utils/providers";
import { SessionProvider } from "../utils/SessionProvider";
import { ThemeProvider } from "../components/theme-provider";


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
        <SessionProvider>
          <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-1/5 min-h-screen bg-main border-r-2">
              <Login />
            </div>
            <div className="w-4/5 min-h-screen ">{children}</div>
            </ThemeProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
