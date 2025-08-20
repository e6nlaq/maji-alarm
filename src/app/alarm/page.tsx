import { getSoundFiles } from "@/lib/sound";
import Clock from "./_components/clock";
import MoveButton from "./_components/move-button";
import { SoundProvider } from "./_hooks/use-sound";

export default function Alarm() {
  const soundFiles = getSoundFiles().map((file) => `/sound/${file}`);

  return (
    <div className="flex flex-col items-center justify-center">
      <Clock />
      <SoundProvider soundPaths={soundFiles}></SoundProvider>
      <MoveButton variant="dark">STOP</MoveButton>
    </div>
  );
}
