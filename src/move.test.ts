import { Move } from "./move";

describe("Move.from", () => {
  describe("when passed a string that doesn't have exactly two characters", () => {
    it("returns null", () => {
      expect(Move.from("")).toEqual(null);
      expect(Move.from("abc")).toEqual(null);
      expect(Move.from("d")).toEqual(null);
    });
  });
  describe("when passed a 2-character string", () => {
    it("returns an object with source and destination labels where the 0 is 'a', 1 is 'b', etc.", () => {
      expect(Move.from("da")).toEqual({ source: 3, destination: 0 });
      expect(Move.from("ym")).toEqual({ source: 24, destination: 12 });
      expect(Move.from("bb")).toEqual({ source: 1, destination: 1 });
    });
  });
});
