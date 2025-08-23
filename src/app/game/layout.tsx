import { SoundProvider } from "@/hooks/use-sound";
import { getSoundFiles } from "@/lib/sound";
import { ResolvingMetadata } from "next";

export async function generateMetadata(parent: ResolvingMetadata) {
  const parentTitle = (await parent).title;
}
  

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const soundFiles = getSoundFiles().map((file) => `/sound/${file}`);

  return (
    <div className="relative flex flex-col items-center justify-center h-svh animate-rainbow-bg">
      <SoundProvider soundPaths={soundFiles} volume={0.5}></SoundProvider>
      {children}
    </div>
  );
}
