import type { Metadata } from "next";
import GamePageLayout from "@/components/game-page-layout";
import type { GameData } from "@/types/game";
import EmojiGame from "./emoji";

const gameData: GameData = {
  title: "絵文字探し",
  description:
    "たくさんの同じ絵文字の中から、一つだけ違う絵文字を素早く見つけてタップするゲームです。一回でも正解すればクリアです。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

export default function EmojiPage() {
  return (
    <GamePageLayout gameData={gameData}>
      <EmojiGame />
    </GamePageLayout>
  );
}