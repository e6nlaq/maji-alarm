import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CircleAlert } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lineSeed = localFont({
  src: [
    {
      path: "./font/seed/LINESeedJP_OTF_Bd.woff2",
      weight: "700",
    },
    {
      path: "./font/seed/LINESeedJP_OTF_Eb.woff2",
      weight: "800",
    },
    {
      path: "./font/seed/LINESeedJP_OTF_Rg.woff2",
      weight: "400",
    },
    {
      path: "./font/seed/LINESeedJP_OTF_Th.woff2",
      weight: "100",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Maji Alarm",
    absolute: "Maji Alarm",
  },
  description: "マジで絶対起こすアラーム",
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${lineSeed.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <noscript>
            <Alert className="w-fit" variant="destructive">
              <CircleAlert className="h-4 w-4" />
              <AlertTitle>JavaScriptを有効にしてください</AlertTitle>
              <AlertDescription>
                このサイトを正しく表示するにはJavaScriptを有効にしていただく必要があります。
              </AlertDescription>
            </Alert>
          </noscript>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
