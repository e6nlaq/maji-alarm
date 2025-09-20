"use client";

import { CheckCircleIcon, CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSound from "use-sound";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getRandomInt } from "@/lib/rand";
import { cn } from "@/lib/utils";

const WINNING_STREAK = 5;
const ANSWER_TIMEOUT_MS = 700;
const NEXT_QUESTION_COUNTDOWN_SECONDS = 3;
const RESULT_DISPLAY_MS = 1500;

const COLORS = [
  { jpName: "赤", className: "text-red-500" },
  { jpName: "青", className: "text-blue-500" },
  { jpName: "緑", className: "text-green-500" },
  { jpName: "黄", className: "text-yellow-500" },
  { jpName: "紫", className: "text-purple-500" },
  { jpName: "橙", className: "text-orange-500" },
];

type GameState = "idle" | "countdown" | "playing" | "result";
type Question = {
  text: string;
  textColorClass: string;
  isMatch: boolean;
};

export default function ColorGame() {
  const router = useRouter();
  const [playCountdownSound] = useSound("/sound/game/show.mp3");
  const [playWrongSound] = useSound("/sound/game/wrong.mp3");
  const [playCorrectSound] = useSound("/sound/game/correct.mp3");

  const [gameState, setGameState] = useState<GameState>("idle");
  const [question, setQuestion] = useState<Question | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(NEXT_QUESTION_COUNTDOWN_SECONDS);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIMEOUT_MS);

  // Countdown timer before each question
  useEffect(() => {
    if (gameState !== "countdown") return;

    if (playCountdownSound && countdown > 0) playCountdownSound();

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    // When countdown is over, start the game immediately
    generateQuestion();
    setGameState("playing");
    setTimeLeft(ANSWER_TIMEOUT_MS);
  }, [gameState, countdown]);

  // 1-second timer to answer the question
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setTimeout(() => {
      if (timeLeft <= 0) {
        // Time's up
        handleAnswer(null);
      } else {
        setTimeLeft(timeLeft - 10);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  // Timer to display result before starting next countdown
  useEffect(() => {
    if (gameState !== "result") return;

    const timer = setTimeout(() => {
      if (streak >= WINNING_STREAK) {
        if (playCorrectSound) playCorrectSound();
        toast.success("クリア！おめでとうございます！");
        router.push("/gm");
      } else {
        setCountdown(NEXT_QUESTION_COUNTDOWN_SECONDS);
        setGameState("countdown");
      }
    }, RESULT_DISPLAY_MS);

    return () => clearTimeout(timer);
  }, [gameState, streak, router, playCorrectSound]);

  const startGame = () => {
    if (playCountdownSound) playCountdownSound();
    setStreak(0);
    setIsCorrect(null);
    setCountdown(NEXT_QUESTION_COUNTDOWN_SECONDS);
    setGameState("countdown");
  };

  const generateQuestion = () => {
    const shouldMatch = Math.random() > 0.5;
    const textIndex = getRandomInt(0, COLORS.length - 1);
    let colorIndex: number;

    if (shouldMatch) {
      colorIndex = textIndex;
    } else {
      do {
        colorIndex = getRandomInt(0, COLORS.length - 1);
      } while (colorIndex === textIndex);
    }

    setQuestion({
      text: COLORS[textIndex].jpName,
      textColorClass: COLORS[colorIndex].className,
      isMatch: shouldMatch,
    });
  };

  const handleAnswer = (answer: boolean | null) => {
    if (gameState !== "playing") return;

    const correct = answer === question?.isMatch;

    if (correct) {
      if (playCorrectSound) playCorrectSound();
      setStreak((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      if (playWrongSound) playWrongSound();
      setStreak(0);
      setIsCorrect(false);
    }
    setGameState("result");
  };

  const renderGameState = () => {
    switch (gameState) {
      case "countdown":
        return (
          <div className="flex items-center justify-center md:text-9xl text-7xl font-bold h-48">
            {countdown > 0 && countdown}
          </div>
        );
      case "playing":
        if (!question) return null;
        return (
          <div className="flex flex-col items-center justify-center gap-8 h-48">
            <div
              className={cn(
                "flex items-center justify-center text-8xl font-bold",
                question.textColorClass
              )}
            >
              {question.text}
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => handleAnswer(true)}
                className="cursor-pointer w-24"
                size="lg"
              >
                はい
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                className="cursor-pointer w-24"
                size="lg"
                variant="destructive"
              >
                いいえ
              </Button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(timeLeft / ANSWER_TIMEOUT_MS) * 100}%` }}
              />
            </div>
          </div>
        );
      case "result":
        return (
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <Alert
              variant={
                isCorrect === null || !isCorrect ? "destructive" : "default"
              }
              className="w-full"
            >
              {isCorrect ? (
                <CheckCircleIcon className="h-4 w-4" />
              ) : (
                <CircleXIcon className="h-4 w-4" />
              )}
              <AlertTitle>
                {isCorrect === null
                  ? "時間切れ..."
                  : isCorrect
                    ? "正解！"
                    : "不正解..."}
              </AlertTitle>
              <AlertDescription>
                {isCorrect
                  ? `連続正解: ${streak}`
                  : "連続正解がリセットされました。"}
              </AlertDescription>
            </Alert>
            <p className="font-bold text-xl">次の問題の準備をしています...</p>
          </div>
        );
      default:
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="sm:text-5xl text-3xl font-bold">カラーマッチ</h1>
            <Button onClick={startGame} size="lg" className="cursor-pointer">
              スタート
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {renderGameState()}
    </div>
  );
}
