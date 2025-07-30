import Link from "next/link";
import { Geist_Mono } from "next/font/google";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-18">
      <div className="flex flex-col items-center gap-2">
        <h1 className={`text-9xl font-bold ${geistMono.className}`}>
          <NumberTicker value={404} startValue={200} />
        </h1>
        <p className="text-lg font-semibold">Page Not Found</p>
      </div>
      <Button asChild className="w-fit">
        <Link href="/">トップページに戻る</Link>
      </Button>
    </div>
  );
}
