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
      <DialogContent className="dark:bg-background/25 bg-background/65 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>{gameData.title}</DialogTitle>
          <DialogDescription>{gameData.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer">閉じる</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
