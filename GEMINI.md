# Rules for GEMINI

## 基本
- OSはWindows11です。
  - そのため、Linuxコマンドは使えないことを意識してください。

## JavaScript / TypeScript

- node や npm,yarn,pnpm は使用しないでください。
- bun と bunx を使用してください。
- 極力依存関係の追加(bun add や package.json の編集)は避けてください。

## ファイル

- src/components/magicui および src/components/ui、 src/app/font/ 内のファイルは、明示的な要求なしに変更・追加しないでください。

## Next.js

- client component の使用は、極力避けて、必要な場合は別ファイルに実装するようにしてください。
- このプロジェクトは App Router を使用しています。

## テストコード
- テストコードは、src/test内に*.test.{ts,tsx}の形式で配置してください。
- テストはbun:testを使用してください。

## 許可

- カレントディレクトリより上の階層のフォルダやファイルの読み取り・書き込みは決して行わないでください(例外はありません)
