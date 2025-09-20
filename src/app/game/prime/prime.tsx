"use client";

import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useSound from "use-sound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { isPrime } from "@/lib/prime";
import { getRandomInt } from "@/lib/rand";
import { cn } from "@/lib/utils";

const abacusFont = localFont({
  src: "../../font/ABACUS2.woff2",
  display: "swap",
});

type GameState = "idle" | "playing" | "loading";

export default function PrimeGame() {
  const router = useRouter();
  const [playWrongSound] = useSound("/sound/game/wrong.mp3");
  const [playCorrectSound] = useSound("/sound/game/correct.mp3");

  const [gameState, setGameState] = useState<GameState>("idle");
  const [targetNumber, setTargetNumber] = useState(0);
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  const startGame = () => {
    let newNumber: number;
    do {
      newNumber = getRandomInt(10, 300);
    } while (isPrime(newNumber));
    setTargetNumber(newNumber);
    setUserInput("");
    setGameState("playing");
  };

  const checkAnswer = () => {
    const answer = parseInt(userInput, 10);
    setUserInput("");

    if (Number.isNaN(answer) || answer <= 1) {
      if (playWrongSound) playWrongSound();
      toast.error("2以上の整数を入力してください。");
      return;
    }

    if (!isPrime(answer)) {
      if (playWrongSound) playWrongSound();
      toast.error(`${answer} は素数ではありません。新しい数字でやり直します。`);
      setGameState("loading");
      setTimeout(startGame, 1500);
      return;
    }

    if (targetNumber % answer === 0) {
      const newTarget = targetNumber / answer;
      setTargetNumber(newTarget);
      if (playCorrectSound) playCorrectSound();

      if (newTarget === 1) {
        toast.success("クリア！おめでとうございます！");
        router.push("/gm");
        return;
      }

      toast.success(`正解！ ${answer} で割りました。`);
    } else {
      if (playWrongSound) playWrongSound();
      toast.error(
        `${targetNumber} は ${answer} で割り切れません。新しい数字でやり直します。`
      );
      setGameState("loading");
      setTimeout(startGame, 1500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (/^[0-9]+$/.test(e.target.value) || e.target.value === "") &&
      e.target.value.length <= 3
    ) {
      setUserInput(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const renderGameState = () => {
    switch (gameState) {
      case "loading":
        return (
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-24 w-48" />
            <p>素数を入力して割ってください</p>
            <Input
              min={2}
              inputMode="numeric"
              className="text-center"
              disabled
              value={userInput}
            />
            <Button className="cursor-pointer" disabled>
              割る
            </Button>
          </div>
        );
      case "playing":
        return (
          <div className="flex flex-col items-center gap-4">
            <div
              className={cn(
                "text-7xl font-bold text-green-500 h-24 flex items-center justify-center",
                abacusFont.className
              )}
            >
              {targetNumber}
            </div>
            <p>素数を入力して割ってください</p>
            <Input
              ref={inputRef}
              min={2}
              inputMode="numeric"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="text-center"
            />
            <Button onClick={checkAnswer} className="cursor-pointer">
              割る
            </Button>
          </div>
        );
      default: // idle
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="sm:text-5xl text-3xl font-bold">素因数分解</h1>
            <Button onClick={startGame} size="lg" className="cursor-pointer">
              スタート
            </Button>
          </div>
        );
    }
  };

  return renderGameState();
}
