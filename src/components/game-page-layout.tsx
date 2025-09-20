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
      <div className="w-full h-full flex flex-col items-center gap-8">
        <div className="w-full h-full p-8 border rounded-lg shadow-lg bg-card text-card-foreground min-h-[250px] flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
