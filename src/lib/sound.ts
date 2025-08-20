import fs from "node:fs";
import path from "node:path";

/**
 * public/sound ディレクトリ内の音声ファイル名のリストを取得します。
 * この関数はサーバーサイドでのみ動作します。
 * @returns ファイル名の文字列配列。ディレクトリが読み取れない場合は空の配列を返します。
 */
export const getSoundFiles = (
  soundDirectory = path.join(process.cwd(), "public/sound")
): string[] => {
  try {
    // ディレクトリの内容を同期的に読み取り
    const allFiles = fs.readdirSync(soundDirectory);

    // '.gitkeep' のようなプレースホルダーファイルを除外
    const soundFiles = allFiles.filter(
      (file) =>
        file !== ".gitkeep" &&
        fs.statSync(path.join(soundDirectory, file)).isFile()
    );

    return soundFiles;
  } catch (error) {
    // エラーが発生した場合はコンソールに出力し、空の配列を返す
    console.error("Error reading sound directory:", error);
    return [];
  }
};
