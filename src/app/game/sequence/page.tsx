import type { Metadata } from "next";
import GamePageLayout from "@/components/game-page-layout";
import type { GameData } from "@/types/game";
import SequenceGame from "./sequence";

const gameData: GameData = {
  title: "順番記憶",
  description:
    "光るパネルの順番を記憶し、その通りに再現するゲームです。5ラウンドクリアでアラームを解除できます。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

export default function SequencePage() {
  return (
    <GamePageLayout gameData={gameData}>
      <SequenceGame />
    </GamePageLayout>
  );
}
