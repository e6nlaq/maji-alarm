"use client";

import { CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSound from "use-sound";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isPrime } from "@/lib/prime";
import { getRandomInt } from "@/lib/rand";

type GameState = "idle" | "playing" | "result";

export default function PrimeGame() {
  const router = useRouter();
  const [playWrongSound] = useSound("/sound/flash/wrong.mp3");
  const [playCorrectSound] = useSound("/sound/flash/show.mp3");

  const [gameState, setGameState] = useState<GameState>("idle");
  const [targetNumber, setTargetNumber] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const startGame = () => {
    let newNumber: number;
    do {
      newNumber = getRandomInt(10, 100);
    } while (isPrime(newNumber));
    setTargetNumber(newNumber);
    setUserInput("");
    setErrorMessage("");
    setGameState("playing");
  };

  const checkAnswer = () => {
    const answer = parseInt(userInput, 10);
    setUserInput("");

    if (Number.isNaN(answer) || answer <= 1) {
      if (playWrongSound) playWrongSound();
      setErrorMessage("2以上の整数を入力してください。");
      setGameState("result");
      return;
    }

    if (!isPrime(answer)) {
      if (playWrongSound) playWrongSound();
      setErrorMessage(`${answer} は素数ではありません。`);
      setGameState("result");
      return;
    }

    if (targetNumber % answer === 0) {
      const newTarget = targetNumber / answer;
      if (playCorrectSound) playCorrectSound();

      if (newTarget === 1) {
        router.push("/gm");
        return;
      }

      setTargetNumber(newTarget);
    } else {
      if (playWrongSound) playWrongSound();
      setErrorMessage(`${targetNumber} は ${answer} で割り切れません。`);
      setGameState("result");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]*$/.test(e.target.value)) {
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
      case "playing":
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="text-7xl font-bold text-green-500 h-24 flex items-center justify-center">
              {targetNumber}
            </div>
            <p>素数を入力して割ってください</p>
            <Input
              type="number"
              min={2}
              inputMode="numeric"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="text-center"
              autoFocus
            />
            <Button onClick={checkAnswer} className="cursor-pointer">
              割る
            </Button>
          </div>
        );
      case "result":
        return (
          <div className="flex flex-col items-center gap-4">
            <Alert variant="destructive" className="w-full">
              <CircleXIcon className="h-4 w-4" />
              <AlertTitle>不正解...</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
            <Button onClick={startGame} className="cursor-pointer">
              もう一度挑戦
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

  return (
    <div className="w-full h-full flex flex-col items-center gap-8">
      <div className="w-full h-full p-8 border rounded-lg shadow-lg bg-card text-card-foreground min-h-[250px] flex items-center justify-center">
        {renderGameState()}
      </div>
    </div>
  );
}
