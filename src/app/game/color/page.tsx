import type { Metadata } from "next";
import GamePageLayout from "@/components/game-page-layout";
import type { GameData } from "@/types/game";
import ColorGame from "./color";

const gameData: GameData = {
  title: "色合わせゲーム",
  description:
    "文字の意味と色が一致しているかを判断するゲームです。脳を刺激して目を覚ましましょう！",
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
