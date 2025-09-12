import HowToPlay from "@/components/how-to-play";
import type { GameData } from "@/types/game";

interface GamePageLayoutProps {
  gameData: GameData;
  children: React.ReactNode;
}

export default function GamePageLayout({
  gameData,
  children,
}: GamePageLayoutProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-2 sm:p-8 md:p-16 lg:p-32 w-full">
      <HowToPlay gameData={gameData} />
      {children}
    </div>
  );
}
