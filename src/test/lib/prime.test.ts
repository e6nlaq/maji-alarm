import { expect, test } from "bun:test";
import { isPrime } from "@/lib/prime";

test("isPrime", () => {
  expect(isPrime(2)).toBe(true);
  expect(isPrime(3)).toBe(true);
  expect(isPrime(5)).toBe(true);
  expect(isPrime(7)).toBe(true);
  expect(isPrime(11)).toBe(true);
  expect(isPrime(13)).toBe(true);

  expect(isPrime(-1)).toBe(false);
  expect(isPrime(0)).toBe(false);
  expect(isPrime(1)).toBe(false);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(6)).toBe(false);
  expect(isPrime(8)).toBe(false);
  expect(isPrime(9)).toBe(false);
  expect(isPrime(10)).toBe(false);
  expect(isPrime(12)).toBe(false);
});

test("isPrime with random composite numbers", () => {
  for (let i = 0; i < 100; i++) {
    const a = Math.floor(Math.random() * 99) + 2;
    const b = Math.floor(Math.random() * 99) + 2;
    const composite = a * b;
    expect(isPrime(composite)).toBe(false);
  }
});
