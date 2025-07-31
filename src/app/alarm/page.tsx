import { getSoundFiles } from "@/lib/sounds";
import Clock from "./clock";
import { SoundProvider } from "./sound";

export default function Alarm() {
  const soundFiles = getSoundFiles().map((file) => `/sound/${file}`);
  console.log(soundFiles);

  return (
    <div className="relative flex items-center justify-center h-svh animate-rainbow-bg">
      <Clock />
      <SoundProvider soundPaths={soundFiles}></SoundProvider>
    </div>
  );
}
