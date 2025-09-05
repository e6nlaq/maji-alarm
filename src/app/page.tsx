import { InfoIcon } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "@/components/magicui/meteors";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-svh gap-8 relative overflow-hidden w-full">
      <Meteors />
      <div className="flex flex-col items-center gap-6">
        <h1 className="md:text-8xl sm:text-6xl text-5xl font-black tracking-tighter">
          <AuroraText>Maji</AuroraText> Alarm
        </h1>
        <span className="inline-flex items-center gap-2 md:text-lg">
          <WordRotate
            words={["マジで", "絶対に", "本気で", "ガチで", "死ぬ程"]}
          />
          起こすアラーム
        </span>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <RainbowButton>使い方を見る</RainbowButton>
        </DialogTrigger>
        <DialogContent className="bg-background/65 dark:bg-background/25 backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle>使い方</DialogTitle>
          </DialogHeader>
          <Alert>
            <InfoIcon />
            <AlertTitle>動作環境</AlertTitle>
            <AlertDescription>
              <span>
                動作には「
                <a
                  href="https://apps.apple.com/jp/app/%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88/id1462947752"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-500 dark:text-blue-400"
                >
                  ショートカット
                </a>
                」アプリおよび最新バージョンのブラウザが必要です。
              </span>
            </AlertDescription>
          </Alert>
          TODO: あとで書く
          <DialogFooter>
            <DialogClose asChild>
              <Button>閉じる</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
