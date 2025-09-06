import type { Metadata } from "next";
import HowToPlay from "@/components/how-to-play";
import type { GameData } from "@/types/game";

const gameData: GameData = {
  title: "素因数分解",
  description:
    "2以上の自然数が表示されます。素数を入力することでその数字で除算されるので、表示される数字を1にしてください。なお、間違えた場合は数字が変更されて最初からやり直しになります。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

export default function Prime() {
  return (
    <div>
      <HowToPlay gameData={gameData} />
    </div>
  );
}
