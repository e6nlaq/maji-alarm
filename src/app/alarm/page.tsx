import { getSoundFiles } from "@/lib/sounds";
import Clock from "./clock";

export default function Alarm() {
  const soundFiles = getSoundFiles();
  console.log(soundFiles);

  return (
    <div className="relative flex items-center justify-center h-svh animate-rainbow-bg">
      <Clock />
    </div>
  );
}
