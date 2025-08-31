import type { Metadata } from "next";
import type { GameData } from "@/types/game";

export const gameData: GameData = {
  title: "フラッシュ暗算",
  description:
    "6口/1桁/5秒のフラッシュ暗算を行います。表示された数字の総和を入力してください。",
};

export const metadata: Metadata = {
  title: gameData.title,
};

const Page = () => {
  return <div>{gameData.description}</div>;
};
export default Page;
