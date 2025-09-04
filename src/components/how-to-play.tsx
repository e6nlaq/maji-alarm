import type { GameData } from "@/types/game";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function HowToPlay({ gameData }: { gameData: GameData }) {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{gameData.title}</DialogTitle>
          <DialogDescription>{gameData.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>閉じる</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
