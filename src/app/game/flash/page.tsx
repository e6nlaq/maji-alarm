import type { Metadata } from "next";
import HowToPlay from "@/components/how-to-play";
import type { GameData } from "@/types/game";
import FlashGame from "./flash";

const gameData: GameData = {
  title: "フラッシュ暗算",
  description:
    "6口/1桁/5秒のフラッシュ暗算を行います。3秒間のカウントダウンの後に、表示された数字の総和を入力してください。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

export default function Flash() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-4 sm:p-8 md:p-16 lg:p-32 w-full">
      <HowToPlay gameData={gameData} />
      <FlashGame />
    </div>
  );
}
