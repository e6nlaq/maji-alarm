import {
  RainbowButton,
  type RainbowButtonProps,
} from "@/components/magicui/rainbow-button";
import { cn } from "@/lib/utils";

interface MoveButtonProps extends RainbowButtonProps {}

export default function MoveButton({ className, ...props }: MoveButtonProps) {
  return (
    <RainbowButton
      className={cn("animate-shake", className)}
      {...props}
    />
  );
}