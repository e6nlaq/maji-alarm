import fs from "node:fs";
import path from "node:path";

export const getGameDirectories = () => {
  const gameDirPath = path.join(process.cwd(), "src/app/game");
  try {
    const dirents = fs.readdirSync(gameDirPath, { withFileTypes: true });
    const directories = dirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    return directories;
  } catch (error) {
    console.error("Error reading game directories:", error);
    return [];
  }
};
