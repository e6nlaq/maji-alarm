import Clock from "./_components/clock";
import { SoundProvider } from "./_hooks/use-sound";
import MoveButton from "./_components/move-button";
import { getSoundFiles } from "@/lib/sounds";

export default function Alarm() {
  const soundFiles = getSoundFiles().map((file) => `/sound/${file}`);
  console.log(soundFiles);

  return (
    <div className="relative flex flex-col items-center justify-center h-svh animate-rainbow-bg">
      <Clock />
      <SoundProvider soundPaths={soundFiles}></SoundProvider>
      <MoveButton variant="dark">Pla</MoveButton>
    </div>
  );
}
