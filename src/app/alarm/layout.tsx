import { getSoundFiles } from "@/lib/sound";
import { SoundProvider } from "../../hooks/use-sound";

export default function AlarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const soundFiles = getSoundFiles().map((file) => `/sound/alarm/${file}`);

  return (
    <div className="relative flex flex-col items-center justify-center h-svh animate-rainbow-bg">
      <SoundProvider soundPaths={soundFiles}></SoundProvider>
      {children}
    </div>
  );
}
