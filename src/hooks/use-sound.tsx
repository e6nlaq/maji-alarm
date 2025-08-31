"use client";

import {
  createContext,
  createRef,
  type ReactNode,
  type Ref,
  use,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef, // useRefをインポート
} from "react";
import useSound from "use-sound";

// 1. Soundコンポーネントのインターフェースと実装
export interface SoundRef {
  play: () => void;
  stop: () => void;
}

export function Sound({
  path,
  volume,
  ref,
}: {
  path: string;
  volume?: number;
  ref: Ref<SoundRef>;
}) {
  const [play, { stop }] = useSound(path, {
    interrupt: false,
    volume: volume,
  });

  useImperativeHandle(ref, () => ({
    play,
    stop,
  }));

  // このコンポーネントはUIを持たない
  return null;
}

// 2. Contextの作成
interface SoundContextType {
  soundRefs: React.RefObject<SoundRef | null>[];
  soundPaths: string[];
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// 3. SoundProviderコンポーネントの実装
export function SoundProvider({
  children,
  soundPaths,
  volume,
}: {
  children?: ReactNode;
  soundPaths: string[];
  volume?: number;
}) {
  // useRefを使ってrefの配列を管理する
  const soundRefs = useRef<React.RefObject<SoundRef>[]>([]);
  volume ??= 1;

  // soundPathsの長さに合わせてrefの配列を初期化・更新
  if (soundRefs.current.length !== soundPaths.length) {
    soundRefs.current = Array.from(
      { length: soundPaths.length },
      (_, i) => soundRefs.current[i] ?? createRef<SoundRef>()
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundRefs.current.length === 0) {
        return;
      }
      const randomIndex = Math.floor(Math.random() * soundRefs.current.length);
      const randomSoundRef = soundRefs.current[randomIndex];
      if (randomSoundRef.current) {
        randomSoundRef.current.play();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const contextValue = useMemo(
    () => ({
      soundRefs: soundRefs.current,
      soundPaths,
    }),
    [soundPaths]
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {soundPaths.map((path, index) => (
        <Sound
          key={path}
          path={path}
          ref={soundRefs.current[index]}
          volume={volume}
        />
      ))}
      {children}
    </SoundContext.Provider>
  );
}

// 4. Contextを利用するためのカスタムフック
export function useSounds() {
  const context = use(SoundContext);
  if (context === undefined) {
    throw new Error("useSounds must be used within a SoundProvider");
  }
  return context;
}
