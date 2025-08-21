import { describe, expect, it } from "bun:test";
import { getRandomInt } from "@/lib/rand";

describe("getRandomInt", () => {
  it("should return a random integer within the specified range", () => {
    const min = 1;
    const max = 10;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should return the same value when min and max are equal", () => {
    const value = 5;
    const result = getRandomInt(value, value);
    expect(result).toBe(value);
  });

  it("should handle negative numbers correctly", () => {
    const min = -10;
    const max = -1;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(Number.isInteger(result)).toBe(true);
  });
});
