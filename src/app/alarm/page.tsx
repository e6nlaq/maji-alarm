import Clock from "./_components/clock";
import { SoundProvider } from "./_hooks/use-sound";
import MoveButton from "./_components/move-button";
import { getSoundFiles } from "@/lib/sounds";

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
