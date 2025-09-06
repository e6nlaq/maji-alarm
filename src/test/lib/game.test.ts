/** biome-ignore-all lint/suspicious/noExplicitAny: false */
import { afterEach, describe, expect, it, spyOn } from "bun:test";
import type { Dirent } from "node:fs";
import fs from "node:fs";
import { getGameDirectories } from "@/lib/game";

// fs.Direntの簡易的なモック
const createDirent = (name: string, isDirectory: boolean): Dirent =>
  (({
    name,
    isDirectory: () => isDirectory,
    isFile: () => !isDirectory,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false
  }) as Dirent);

describe("getGameDirectories", () => {
  let readdirSyncSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    // 各テストの後にスパイをリストアする
    readdirSyncSpy.mockRestore();
  });

  it("should return only directories from the list", () => {
    const mockDirents = [
      createDirent("dir1", true),
      createDirent("file1.txt", false),
      createDirent("dir2", true),
    ];
    // fs.readdirSyncをスパイし、モック値を返すようにする
    readdirSyncSpy = spyOn(fs, "readdirSync").mockReturnValue(
      mockDirents as any
    );

    const directories = getGameDirectories();
    expect(directories.sort()).toEqual(["dir1", "dir2"].sort());
    expect(readdirSyncSpy).toHaveBeenCalled();
  });

  it("should return an empty array when no directories exist", () => {
    const mockDirents = [
      createDirent("file1.txt", false),
      createDirent("file2.log", false),
    ];
    readdirSyncSpy = spyOn(fs, "readdirSync").mockReturnValue(
      mockDirents as any
    );

    const directories = getGameDirectories();
    expect(directories).toEqual([]);
    expect(readdirSyncSpy).toHaveBeenCalled();
  });

  it("should return an empty array when the directory is empty", () => {
    const mockDirents: Dirent[] = [];
    readdirSyncSpy = spyOn(fs, "readdirSync").mockReturnValue(
      mockDirents as any
    );

    const directories = getGameDirectories();
    expect(directories).toEqual([]);
    expect(readdirSyncSpy).toHaveBeenCalled();
  });

  it("should return an empty array and log an error if readdirSync fails", () => {
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(
      () => {}
    );
    readdirSyncSpy = spyOn(fs, "readdirSync").mockImplementation(() => {
      throw new Error("Test error");
    });

    const directories = getGameDirectories();
    expect(directories).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
