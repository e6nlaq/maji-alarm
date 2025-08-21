"use client";
import {
  RainbowButton,
  type RainbowButtonProps,
} from "@/components/magicui/rainbow-button";
import { cn } from "@/lib/utils";

interface MoveButtonProps extends RainbowButtonProps {}

export default function MoveButton({ className, ...props }: MoveButtonProps) {
  return (
    <RainbowButton
      className={cn(
        process.env.NODE_ENV !== "development" && "animate-shake",
        "text-lg",
        className
      )}
      size="lg"
      {...props}
    />
  );
}
