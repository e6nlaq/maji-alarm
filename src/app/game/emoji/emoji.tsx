"use client";

import { CheckCircleIcon, CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSound from "use-sound";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getRandomInt } from "@/lib/rand";

const GRID_SIZE = 6; // グリッドサイズ (6x6)
const TIME_LIMIT_MS = 7000; // 制限時間 (7秒)
const RESULT_DISPLAY_MS = 1500;

const EMOJI_PAIRS = [
  { base: "😊", target: "🙂" },
  { base: "😄", target: "😃" },
  { base: "☀️", target: "🌞" },
  { base: "❤️", target: "🩷" },
  { base: "👍", target: "👍🏻" },
  { base: "✈️", target: "🚀" },
  { base: "🍎", target: "🍏" },
  { base: "🐈", target: "🐈‍⬛" },
  { base: "🥲", target: "😂" },
  { base: "🤔", target: "🧐" },
  { base: "👀", target: "👁️" },
  { base: "✨", target: "🌟" },
];

type GameState = "idle" | "countdown" | "playing" | "result";
type TargetPosition = { row: number; col: number };

export default function EmojiGame() {
  const router = useRouter();
  const [playCountdownSound] = useSound("/sound/game/countdown.mp3");
  const [playWrongSound] = useSound("/sound/game/wrong.mp3");
  const [playCorrectSound] = useSound("/sound/game/correct.mp3");

  const [gameState, setGameState] = useState<GameState>("idle");
  const [gridData, setGridData] = useState<string[][]>([]);
  const [targetPosition, setTargetPosition] = useState<TargetPosition | null>(
    null
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_MS);

  // 各ラウンドの開始処理
  const generateGrid = () => {
    const pair = EMOJI_PAIRS[getRandomInt(0, EMOJI_PAIRS.length - 1)];
    const newGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(pair.base));

    const targetRow = getRandomInt(0, GRID_SIZE - 1);
    const targetCol = getRandomInt(0, GRID_SIZE - 1);
    newGrid[targetRow][targetCol] = pair.target;

    setGridData(newGrid);
    setTargetPosition({ row: targetRow, col: targetCol });
  };

  // ゲーム開始
  const startGame = () => {
    if (playCountdownSound) playCountdownSound();
    setCountdown(3);
    setIsCorrect(null);
    generateGrid();
    setGameState("countdown");
  };

  // カウントダウンタイマー
  useEffect(() => {
    if (gameState !== "countdown") return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    const startTimer = setTimeout(() => {
      setGameState("playing");
      setTimeLeft(TIME_LIMIT_MS);
    }, 1000);
    return () => clearTimeout(startTimer);
  }, [gameState, countdown]);

  // 制限時間タイマー
  // biome-ignore lint/correctness/useExhaustiveDependencies: off
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      handleEmojiClick(-1, -1); // 時間切れ
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 50), 50);
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  // 結果表示後の処理
  useEffect(() => {
    if (gameState !== "result") return;
    if (isCorrect) {
      const timer = setTimeout(() => {
        toast.success("クリア！おめでとうございます！");
        router.push("/gm");
      }, RESULT_DISPLAY_MS);
      return () => clearTimeout(timer);
    }
  }, [gameState, isCorrect, router]);

  // 絵文字クリック時の処理
  const handleEmojiClick = (row: number, col: number) => {
    if (gameState !== "playing") return;

    if (row === targetPosition?.row && col === targetPosition?.col) {
      if (playCorrectSound) playCorrectSound();
      setIsCorrect(true);
    } else if (row === -1 && col === -1) {
      // 時間切れ
      if (playWrongSound) playWrongSound();
      setIsCorrect(null);
    } else {
      // 不正解
      if (playWrongSound) playWrongSound();
      setIsCorrect(false);
    }
    setGameState("result");
  };

  const renderGameState = () => {
    switch (gameState) {
      case "countdown":
        return (
          <div className="flex items-center justify-center text-7xl font-bold md:text-9xl">
            {countdown > 0 ? countdown : "Start!"}
          </div>
        );
      case "playing":
        return (
          <div className="flex flex-col items-center gap-4">
            <div
              className={`grid w-full max-w-md gap-1 md:gap-2`}
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            >
              {gridData.map((row, rowIndex) =>
                row.map((emoji, colIndex) => (
                  <Button
                    key={`${rowIndex}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: none
                      colIndex
                    }`}
                    variant="outline"
                    className="aspect-square h-auto w-full p-1 text-2xl md:text-4xl"
                    onClick={() => handleEmojiClick(rowIndex, colIndex)}
                  >
                    {emoji}
                  </Button>
                ))
              )}
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-blue-600 transition-all duration-50"
                style={{ width: `${(timeLeft / TIME_LIMIT_MS) * 100}%` }}
              />
            </div>
          </div>
        );
      case "result":
        return (
          <div className="flex w-full max-w-md flex-col items-center gap-4">
            <Alert
              variant={isCorrect ? "default" : "destructive"}
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
            </Alert>
            {isCorrect ? (
              <p className="text-xl font-bold">クリア処理中です...</p>
            ) : (
              <Button onClick={startGame} className="cursor-pointer">
                もう一度挑戦
              </Button>
            )}
          </div>
        );
      default:
        return (
          <Button onClick={startGame} size="lg" className="cursor-pointer">
            スタート
          </Button>
        );
    }
  };

  return (
    <div className="flex h-64 w-full items-center justify-center">
      {renderGameState()}
    </div>
  );
}
