import Link from "next/link";
import { getGameDirectories } from "@/lib/game";
import { getRandomInt } from "@/lib/rand";
import Clock from "./_components/clock";
import MoveButton from "./_components/move-button";

export default function Alarm() {
  const games = getGameDirectories();
  const randomIndex = getRandomInt(0, games.length - 1);

  return (
    <div className="flex flex-col items-center justify-center gap-y-5">
      <Clock />
      <MoveButton variant="dark" asChild>
        <Link href={`/game/${games[randomIndex]}`}>STOP</Link>
      </MoveButton>
    </div>
  );
}
