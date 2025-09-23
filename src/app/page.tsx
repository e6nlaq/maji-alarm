import { InfoIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "@/components/magicui/meteors";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { dialogClass } from "@/lib/css";
import Image from "next/image";
import { cn } from "@/lib/utils";

function ExplainImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="60%"
      style={{ width: "60%", height: "auto", borderRadius: "10px" }}
    />
  );
}

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

      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <RainbowButton>使い方を見る</RainbowButton>
          </DialogTrigger>
          <DialogContent
            className={cn(dialogClass, "overflow-y-auto max-h-[90svh]")}
          >
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
            <ol className="flex flex-col gap-y-6 [&>li]:flex [&>li]:flex-col [&>li]:gap-2">
              <li>
                <span>
                  1.{" "}
                  <a
                    href="https://www.icloud.com/shortcuts/f4e9e3f550ea49168ccc775b99689d25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-500 dark:text-blue-400"
                  >
                    こちら
                  </a>
                  から公式ショートカットを入手する
                </span>
              </li>
              <li>2. ショートカットアプリからオートメーションを開く</li>
              <li>
                3. +ボタンを押して新しいオートメーションを作成する
                <ExplainImage
                  src="/explain/automation.png"
                  alt="オートメーションタブの+ボタンに矢印が指されている画像"
                />
              </li>
              <li>
                4. お好みでオートメーションを選択する(ここでは時刻)
                <ExplainImage
                  src="/explain/select.png"
                  alt="オートメーション選択画面"
                />
              </li>
              <li>
                5. オートメーションを設定して次へを押す
                <Alert>
                  <TriangleAlertIcon />
                  <AlertTitle>注意</AlertTitle>
                  <AlertDescription className="font-bold underline">
                    「すぐに実行」を必ず選択してください。
                  </AlertDescription>
                </Alert>
                <ExplainImage
                  src="/explain/config.png"
                  alt="トリガーの設定画面"
                />
              </li>
              <li>
                6. ショートカット「Maji Alarm」を選択する
                <ExplainImage
                  src="/explain/shortcut.png"
                  alt="ショートカットを選択する画面"
                />
              </li>
              <li>7. 設定完了</li>
              これで、設定したオートメーションが起動すると、Maji
              Alarmが起動するようになります。
            </ol>
            <DialogFooter>
              <DialogClose asChild>
                <Button autoFocus>閉じる</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <RainbowButton>試す</RainbowButton>
          </AlertDialogTrigger>
          <AlertDialogContent className={dialogClass}>
            <AlertDialogHeader>
              <AlertDialogTitle>警告</AlertDialogTitle>
              <AlertDialogDescription>
                このアプリは
                <span className="font-bold underline">非常にうるさい音声</span>
                が出ます。周りの環境や音量に注意してお試しください。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href="/alarm">続行</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
