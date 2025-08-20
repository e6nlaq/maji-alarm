import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { getSoundFiles } from "@/lib/sound";

const testDir = path.join(__dirname, "test_sounds");

describe("getSoundFiles", () => {
  // テストの前に一時ディレクトリとファイルを作成
  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.writeFileSync(path.join(testDir, "sound1.mp3"), "");
    fs.writeFileSync(path.join(testDir, "sound2.wav"), "");
    fs.writeFileSync(path.join(testDir, ".gitkeep"), "");
    fs.mkdirSync(path.join(testDir, "a_directory"));
  });

  // テストの後に一時ディレクトリをクリーンアップ
  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  test("should return a list of sound files from a specified directory", () => {
    const sounds = getSoundFiles(testDir);
    // .gitkeepとディレクトリが除外されていることを確認
    expect(sounds).toHaveLength(2);
    expect(sounds).toContain("sound1.mp3");
    expect(sounds).toContain("sound2.wav");
    expect(sounds).not.toContain(".gitkeep");
    expect(sounds).not.toContain("a_directory");
  });

  test("should return an empty array for a non-existent directory", () => {
    const sounds = getSoundFiles(path.join(__dirname, "non_existent_dir"));
    expect(sounds).toEqual([]);
  });

  test("should return an empty array when directory is not specified and public/sound does not exist", () => {
    // このテストは、public/soundが存在しない環境で実行する必要がある
    // ここでは、存在しないパスを渡すことでシミュレートする
    const sounds = getSoundFiles(
      path.join(process.cwd(), "non_existent_public", "sound")
    );
    expect(sounds).toEqual([]);
  });
});
