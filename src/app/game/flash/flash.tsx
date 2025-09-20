"use client";

import { CircleXIcon } from "lucide-react";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import useSound from "use-sound";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRandomInt } from "@/lib/rand";
import { cn } from "@/lib/utils";

const TOTAL_NUMBERS = 6;
const DURATION_SECONDS = 5;
const INTERVAL_MS = (DURATION_SECONDS / TOTAL_NUMBERS) * 1000;
const COUNTDOWN_SECONDS = 3;

const abacusFont = localFont({
  src: "../../font/ABACUS2.woff2",
  display: "swap",
});

type GameState = "idle" | "countdown" | "playing" | "input" | "result";

export default function FlashGame() {
  const router = useRouter();
  const [playCountdownSound] = useSound("/sound/game/countdown.mp3");
  const [playShowSound] = useSound("/sound/game/show.mp3");
  const [playWrongSound] = useSound("/sound/game/wrong.mp3");
  const [playCorrectSound] = useSound("/sound/game/correct.mp3");
  const [gameState, setGameState] = useState<GameState>("idle");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  const sum = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers]);

  // Game play timer for switching numbers
  useEffect(() => {
    if (gameState !== "playing") return;

    if (currentIndex < TOTAL_NUMBERS) {
      if (playShowSound) playShowSound();
    }

    if (currentIndex >= TOTAL_NUMBERS) {
      setGameState("input");
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [gameState, currentIndex, playShowSound]);

  // Countdown timer
  useEffect(() => {
    if (gameState !== "countdown") return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // When countdown is over, wait a bit before starting the game
      const startTimer = setTimeout(() => {
        setGameState("playing");
      }, 1000); // Show "Start!" for 1 second
      return () => clearTimeout(startTimer);
    }
  }, [gameState, countdown]);

  const startGame = () => {
    if (playCountdownSound) playCountdownSound();
    const newNumbers: number[] = [];
    let lastNumber = -1; // A number that won't be generated
    for (let i = 0; i < TOTAL_NUMBERS; i++) {
      let nextNumber: number;
      do {
        nextNumber = getRandomInt(1, 9);
      } while (nextNumber === lastNumber);
      newNumbers.push(nextNumber);
      lastNumber = nextNumber;
    }
    setNumbers(newNumbers);
    setCurrentIndex(0);
    setUserAnswer("");
    setIsCorrect(null);
    setCountdown(COUNTDOWN_SECONDS);
    setGameState("countdown");
  };

  const checkAnswer = () => {
    const answer = parseInt(userAnswer, 10);
    if (!Number.isNaN(answer) && answer === sum) {
      if (playCorrectSound) playCorrectSound();
      toast.success("正解！おめでとうございます！");
      router.push("/gm");
    } else {
      if (playWrongSound) playWrongSound();
      setIsCorrect(false);
      setGameState("result");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      /^[0-9]+$/.test(e.target.value) ||
      (e.target.value === "" && e.target.value.length <= 3)
    ) {
      setUserAnswer(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const renderGameState = () => {
    switch (gameState) {
      case "countdown":
        return (
          <div className="flex items-center justify-center md:text-9xl text-7xl font-bold h-48">
            {countdown > 0 ? countdown : "Start!"}
          </div>
        );
      case "playing":
        return (
          <div
            className={cn(
              "flex items-center justify-center text-9xl font-bold h-48 text-green-500",
              abacusFont.className
            )}
          >
            {currentIndex < numbers.length && numbers[currentIndex]}
          </div>
        );
      case "input":
        return (
          <div className="flex flex-col items-center gap-4">
            <p>合計を入力してください</p>
            {/* 若干見栄えが悪くなるのでtypeは設定しない*/}
            <Input
              min={0}
              inputMode="numeric"
              value={userAnswer}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="text-center"
              autoFocus
            />
            <Button onClick={checkAnswer} className="cursor-pointer">
              回答
            </Button>
          </div>
        );
      case "result":
        return (
          <div className="flex flex-col items-center gap-4">
            <Alert
              variant={isCorrect ? "default" : "destructive"}
              className="w-full"
            >
              <CircleXIcon className="h-4 w-4" />
              <AlertTitle>{isCorrect ? "正解！" : "不正解..."}</AlertTitle>
              <AlertDescription>
                {isCorrect
                  ? `おめでとうございます！`
                  : `正解は ${sum} でした。`}
              </AlertDescription>
            </Alert>
            <Button onClick={startGame} className="cursor-pointer">
              もう一度挑戦
            </Button>
          </div>
        );
      default:
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="sm:text-5xl text-3xl font-bold">フラッシュ暗算</h1>
            <Button onClick={startGame} size="lg" className="cursor-pointer">
              スタート
            </Button>
          </div>
        );
    }
  };

  return renderGameState();
}
