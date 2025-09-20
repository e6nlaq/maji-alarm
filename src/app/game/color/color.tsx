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

const PLAYABLE_COLORS = [
  { jpName: "赤", className: "text-red-500" },
  { jpName: "青", className: "text-blue-500" },
  { jpName: "緑", className: "text-green-500" },
  { jpName: "黄", className: "text-yellow-500" },
  { jpName: "紫", className: "text-purple-500" },
  { jpName: "橙", className: "text-orange-500" },
  { jpName: "桃", className: "text-pink-500" },
  { jpName: "灰", className: "text-gray-500" },
];
const TEXT_ONLY_COLORS = [{ jpName: "白" }, { jpName: "黒" }];

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
  const [isGameWon, setGameWon] = useState(false);

  // 各問題の前のカウントダウンタイマー
  // biome-ignore lint/correctness/useExhaustiveDependencies: off
  useEffect(() => {
    if (gameState !== "countdown") return;

    if (playCountdownSound && countdown > 0) playCountdownSound();

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    // カウントダウンが終了したら、すぐにゲームを開始する
    generateQuestion();
    setGameState("playing");
    setTimeLeft(ANSWER_TIMEOUT_MS);
  }, [gameState, countdown]);

  // 問題に解答するためのタイマー
  // biome-ignore lint/correctness/useExhaustiveDependencies: off
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setTimeout(() => {
      if (timeLeft <= 0) {
        // 時間切れ
        handleAnswer(null);
      } else {
        setTimeLeft(timeLeft - 10);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  // 次のカウントダウンを開始する前に結果を表示するためのタイマー
  useEffect(() => {
    if (gameState !== "result") return;

    if (isGameWon) {
      toast.success("クリア！おめでとうございます！");
      router.push("/gm");
    }

    const timer = setTimeout(() => {
      setCountdown(NEXT_QUESTION_COUNTDOWN_SECONDS);
      setGameState("countdown");
    }, RESULT_DISPLAY_MS);

    return () => clearTimeout(timer);
  }, [gameState, isGameWon, router]);

  const startGame = () => {
    if (playCountdownSound) playCountdownSound();
    setStreak(0);
    setIsCorrect(null);
    setGameWon(false);
    setCountdown(NEXT_QUESTION_COUNTDOWN_SECONDS);
    setGameState("countdown");
  };

  const generateQuestion = () => {
    const shouldMatch = Math.random() > 0.5;

    if (shouldMatch) {
      // 表示可能な色のリストから一致する色を選択
      const index = getRandomInt(0, PLAYABLE_COLORS.length - 1);
      setQuestion({
        text: PLAYABLE_COLORS[index].jpName,
        textColorClass: PLAYABLE_COLORS[index].className,
        isMatch: true,
      });
    } else {
      // 一致しない組み合わせを選択
      const allColorNames = [
        ...PLAYABLE_COLORS.map((c) => c.jpName),
        ...TEXT_ONLY_COLORS.map((c) => c.jpName),
      ];
      const text = allColorNames[getRandomInt(0, allColorNames.length - 1)];

      let colorIndex: number;
      do {
        colorIndex = getRandomInt(0, PLAYABLE_COLORS.length - 1);
        // 色名がテキストと偶然一致した場合は、再選択を続ける
      } while (PLAYABLE_COLORS[colorIndex].jpName === text);

      setQuestion({
        text: text,
        textColorClass: PLAYABLE_COLORS[colorIndex].className,
        isMatch: false,
      });
    }
  };

  const handleAnswer = (answer: boolean | null) => {
    if (gameState !== "playing") return;

    const correct = answer === question?.isMatch;

    if (correct) {
      if (playCorrectSound) playCorrectSound();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setIsCorrect(true);
      if (newStreak >= WINNING_STREAK) {
        setGameWon(true);
      }
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
            <p className="font-bold sm:text-xl">
              次の問題の準備をしています...
            </p>
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
