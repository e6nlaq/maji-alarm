import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "@/components/magicui/meteors";
import { WordRotate } from "@/components/magicui/word-rotate";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-svh gap-32 relative overflow-hidden w-full">
      <Meteors />
      <div className="flex flex-col items-center gap-6">
        <h1 className="md:text-8xl sm:text-6xl text-5xl font-black tracking-tighter">
          <AuroraText>Maji</AuroraText> Alarm
        </h1>
        <span className="inline-flex items-center gap-2 md:text-lg">
          <WordRotate
            words={["マジで", "絶対に", "本気で", "ガチで", "死ぬ程"]}
          />
          起こすアラーム
        </span>
      </div>
    </div>
  );
}
