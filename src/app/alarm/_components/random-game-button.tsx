"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRandomInt } from "@/lib/rand";
import MoveButton from "./move-button";

type Props = {
  games: string[];
};

export default function RandomGameButton({ games }: Props) {
  const [gameHref, setGameHref] = useState<string | null>(null);

  useEffect(() => {
    if (games.length > 0) {
      const randomIndex = getRandomInt(0, games.length - 1);
      setGameHref(`/game/${games[randomIndex]}`);
    }
  }, [games]);

  // ハイドレーションの不一致を避けるため、クライアントサイドでhrefが確定するまで何もレンダリングしない
  if (!gameHref) {
    return (
      // プレースホルダーとして同じスタイルのボタンを表示しておく
      <MoveButton variant="dark" asChild disabled>
        <Link href="">STOP</Link>
      </MoveButton>
    );
  }

  return (
    <MoveButton variant="dark" asChild>
      <Link href={gameHref}>STOP</Link>
    </MoveButton>
  );
}
