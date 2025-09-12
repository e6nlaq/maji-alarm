import type { Metadata } from "next";
import GamePageLayout from "@/components/game-page-layout";
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
    <GamePageLayout gameData={gameData}>
      <FlashGame />
    </GamePageLayout>
  );
}