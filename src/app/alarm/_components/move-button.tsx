import {
  RainbowButton,
  type RainbowButtonProps,
} from "@/components/magicui/rainbow-button";

export default function MoveButton(
  props: RainbowButtonProps,
  children: React.ReactNode
) {
  return <RainbowButton {...props}>{children}</RainbowButton>;
}
