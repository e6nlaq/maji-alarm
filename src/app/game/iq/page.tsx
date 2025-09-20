import type { Metadata } from "next";
import GamePageLayout from "@/components/game-page-layout";
import type { GameData } from "@/types/game";
import IqGame from "./iq";

const gameData: GameData = {
  title: "IQ150",
  description:
    "たくさんの同じ文字の中から、一つだけ違う文字を素早く見つけてください。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

export default function IqPage() {
  return (
    <GamePageLayout gameData={gameData}>
      <IqGame />
    </GamePageLayout>
  );
}
