import type { Metadata } from "next";
import GamePageLayout from "@/components/game-page-layout";
import type { GameData } from "@/types/game";
import ColorGame from "./color";

const gameData: GameData = {
  title: "カラーマッチ",
  description:
    "色の名前が表示されます。色の名前と表示されている色が一致するかを判断してください。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

export default function ColorPage() {
  return (
    <GamePageLayout gameData={gameData}>
      <ColorGame />
    </GamePageLayout>
  );
}
