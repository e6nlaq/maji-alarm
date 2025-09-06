"use client";

import { CircleXIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getRandomInt } from "@/lib/rand";
import { cn } from "@/lib/utils";

const TOTAL_NUMBERS = 6;
const DURATION_SECONDS = 5;
const INTERVAL_MS = (DURATION_SECONDS / TOTAL_NUMBERS) * 1000;
const COUNTDOWN_SECONDS = 3;

type GameState = "idle" | "countdown" | "playing" | "input" | "result";

export default function FlashGame() {
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

    if (currentIndex >= TOTAL_NUMBERS) {
      setGameState("input");
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [gameState, currentIndex]);

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
    const newNumbers = Array.from({ length: TOTAL_NUMBERS }, () =>
      getRandomInt(1, 9)
    );
    setNumbers(newNumbers);
    setCurrentIndex(0);
    setUserAnswer("");
    setIsCorrect(null);
    setCountdown(COUNTDOWN_SECONDS);
    setGameState("countdown");
  };

  const checkAnswer = () => {
    const answer = parseInt(userAnswer, 10);
    setIsCorrect(!Number.isNaN(answer) && answer === sum);
    setGameState("result");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
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
          <div className="flex items-center justify-center text-9xl font-bold h-48">
            {countdown > 0 ? countdown : "Start!"}
          </div>
        );
      case "playing":
        return (
          <div className="flex items-center justify-center text-9xl font-bold h-48 text-green-500">
            {currentIndex < numbers.length && numbers[currentIndex]}
          </div>
        );
      case "input":
        return (
          <div className="flex flex-col items-center gap-4">
            <p>合計を入力してください</p>
            <input
              type="number"
              value={userAnswer}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={cn(
                "flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-center text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              )}
              // biome-ignore lint/a11y/noAutofocus: off
              autoFocus
            />
            <Button onClick={checkAnswer}>回答</Button>
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
            <Button onClick={startGame}>もう一度挑戦</Button>
          </div>
        );
      default:
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="sm:text-5xl text-3xl font-bold">フラッシュ暗算</h1>
            <Button onClick={startGame} size="lg">
              スタート
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-8">
      <div className="w-full h-full p-8 border rounded-lg shadow-lg bg-card text-card-foreground min-h-[250px] flex items-center justify-center">
        {renderGameState()}
      </div>
    </div>
  );
}
