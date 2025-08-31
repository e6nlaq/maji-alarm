import { SoundProvider } from "@/hooks/use-sound";
import { getSoundFiles } from "@/lib/sound";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const soundFiles = getSoundFiles().map((file) => `/sound/${file}`);

  return (
    <div className="relative flex flex-col items-center justify-center h-svh">
      <SoundProvider soundPaths={soundFiles} volume={0.5}></SoundProvider>
      {children}
    </div>
  );
}
