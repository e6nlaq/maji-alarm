"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import useSound from "use-sound";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getRandomInt } from "@/lib/rand";
import { cn } from "@/lib/utils";

const PANELS = [
  { id: "red", color: "bg-red-500", litColor: "bg-red-400" },
  { id: "green", color: "bg-green-500", litColor: "bg-green-400" },
  { id: "blue", color: "bg-blue-500", litColor: "bg-blue-400" },
  { id: "yellow", color: "bg-yellow-500", litColor: "bg-yellow-400" },
];

const WINNING_LEVEL = 5;
const PRESENTATION_INTERVAL_MS = 500; // パネルが光る間隔
const LIT_DURATION_MS = 300; // パネルが光っている時間

type GameState = "idle" | "presenting" | "playing" | "result";

export default function SequenceGame() {
  const router = useRouter();
  const [playShowSound] = useSound("/sound/game/show.mp3");
  const [playWrongSound] = useSound("/sound/game/wrong.mp3");
  const [playCorrectSound] = useSound("/sound/game/correct.mp3");

  const [gameState, setGameState] = useState<GameState>("idle");
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [litPanel, setLitPanel] = useState<string | null>(null);
  const [round, setRound] = useState(1);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isInputEnabled, setIsInputEnabled] = useState(false);

  const advanceToNextLevel = useCallback(() => {
    setPlayerSequence([]);
    setGameState("presenting");
    setRound((currentRound) => currentRound + 1);
    setSequence((currentSequence) => {
      const newSequenceLength = 2 * (round + 1) - 1;
      const itemsToAdd = newSequenceLength - currentSequence.length;
      const newItems = Array.from(
        { length: itemsToAdd },
        () => PANELS[getRandomInt(0, PANELS.length - 1)].id
      );
      return [...currentSequence, ...newItems];
    });
  }, [round]);

  const startGame = () => {
    const firstSequence = Array.from(
      { length: 1 },
      () => PANELS[getRandomInt(0, PANELS.length - 1)].id
    );
    setSequence(firstSequence);
    setPlayerSequence([]);
    setRound(1);
    setIsCorrect(null);
    setIsInputEnabled(false);
    setGameState("presenting");
  };

  // 問題提示のロジック
  useEffect(() => {
    if (gameState !== "presenting") return;

    let isCancelled = false;
    const showSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      for (let i = 0; i < sequence.length; i++) {
        if (isCancelled) return;
        if (playShowSound) playShowSound();
        setLitPanel(sequence[i]);
        await new Promise((resolve) => setTimeout(resolve, LIT_DURATION_MS));
        if (isCancelled) return;
        setLitPanel(null);
        await new Promise((resolve) =>
          setTimeout(resolve, PRESENTATION_INTERVAL_MS - LIT_DURATION_MS)
        );
      }
      if (!isCancelled) {
        setGameState("playing");
        setIsInputEnabled(true);
      }
    };

    showSequence();

    return () => {
      isCancelled = true;
    };
  }, [gameState, sequence, playShowSound]);

  // パネルクリック時の処理
  const handlePanelClick = (panelId: string) => {
    if (gameState !== "playing") return;

    const newPlayerSequence = [...playerSequence, panelId];

    if (playShowSound) playShowSound();

    if (sequence[newPlayerSequence.length - 1] !== panelId) {
      // 入力が正しいかチェック
      if (playWrongSound) playWrongSound();
      setIsCorrect(false);
      setIsInputEnabled(false);
      setGameState("result");
      return;
    }

    setPlayerSequence(newPlayerSequence);
    if (newPlayerSequence.length === sequence.length) {
      // パネルを一時的に光らせる

      // シーケンスを最後まで入力したかチェック
      setIsInputEnabled(false);
      if (playCorrectSound) playCorrectSound();
      if (round >= WINNING_LEVEL) {
        setIsCorrect(true);
        setGameState("result");
      } else {
        setTimeout(advanceToNextLevel, 1000);
      }
    }
    setLitPanel(panelId);
    setTimeout(() => setLitPanel(null), 150);


  };

  // ゲームクリア時の処理
  useEffect(() => {
    if (isCorrect) {
        toast.success("クリア！おめでとうございます！");
        router.push("/gm");
    }
  }, [isCorrect, router]);

  const renderGameState = () => {
    switch (gameState) {
      case "idle":
        return (
          <div className="flex w-full max-w-md flex-col items-center gap-4">
            <h1 className="sm:text-5xl text-3xl font-bold">順番記憶</h1>
            <Button onClick={startGame} size="lg" className="cursor-pointer">
              スタート
            </Button>
          </div>
        );
      case 'result':
        return (
          <div className="flex w-full max-w-md flex-col items-center gap-4">
            {isCorrect ? (
              <h2 className="text-5xl font-bold text-green-500">クリア！</h2>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-5xl font-bold text-red-500">不正解...</h2>
                <Button onClick={startGame} className="cursor-pointer">
                  もう一度挑戦
                </Button>
              </div>
            )}
          </div>
        );
      default: // presenting or playing
        return (
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-bold">Round {round}</p>
            <div className="h-8">
              {gameState === "presenting" && (
                <p className="text-xl">覚えて！</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PANELS.map((panel) => (
                <button
                  key={panel.id}
                  type="button"
                  aria-label={panel.id}
                  onClick={() => handlePanelClick(panel.id)}
                  disabled={!isInputEnabled}
                  className={cn(
                    "h-32 w-32 rounded-lg transition-all duration-100 md:h-40 md:w-40",
                    panel.color,
                    litPanel === panel.id && [panel.litColor, "scale-110"],
                    isInputEnabled && "cursor-pointer"
                  )}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-96 w-full items-center justify-center">
      {renderGameState()}
    </div>
  );
}
