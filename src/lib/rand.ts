/**
 * minからmaxまでのランダムな整数を返す
 * @param min 最小値
 * @param max 最大値
 * @returns minからmaxまでのランダムな整数
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
