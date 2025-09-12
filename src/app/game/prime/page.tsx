import type { Metadata } from "next";
import GamePageLayout from "@/components/game-page-layout";
import type { GameData } from "@/types/game";
import PrimeGame from "./prime";

const gameData: GameData = {
  title: "素因数分解",
  description:
    "2以上の自然数が表示されます。素数を入力することでその数字で除算されるので、表示される数字を1にしてください。なお、割り切れない数字や合成数を入力した場合は数字が変更されて最初からやり直しになります。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

export default function PrimePage() {
  return (
    <GamePageLayout gameData={gameData}>
      <PrimeGame />
    </GamePageLayout>
  );
}