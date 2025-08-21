import { getSoundFiles } from "@/lib/sound";
import { SoundProvider } from "./_hooks/use-sound";

export default function AlarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const soundFiles = getSoundFiles().map((file) => `/sound/${file}`);

  return (
    <div className="relative flex flex-col items-center justify-center h-svh animate-rainbow-bg">
      <SoundProvider soundPaths={soundFiles}></SoundProvider>
      {children}
    </div>
  );
}
