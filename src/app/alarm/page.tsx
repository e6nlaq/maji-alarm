import { getGameDirectories } from "@/lib/game";
import Clock from "./_components/clock";
import RandomGameButton from "./_components/random-game-button";

export const dynamic = "force-dynamic";

export default function Alarm() {
  const games = getGameDirectories();

  return (
    <div className="flex flex-col items-center justify-center gap-y-5">
      <Clock />
      <RandomGameButton games={games} />
    </div>
  );
}
