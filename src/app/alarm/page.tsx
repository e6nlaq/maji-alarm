import { getGameDirectories } from "@/lib/game";
import Clock from "./_components/clock";
import MoveButton from "./_components/move-button";
import Link from "next/link";

export default function Alarm() {
  const games = getGameDirectories();
  const randomIndex = Math.floor(Math.random() * games.length);

  return (
    <div className="flex flex-col items-center justify-center">
      <Clock />
      <MoveButton variant="dark">
        <Link href={`/game/${games[randomIndex]}`}>STOP</Link>
      </MoveButton>
    </div>
  );
}
