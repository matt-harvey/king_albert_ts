import { Seq } from "immutable";

import { Rank } from "./rank";

describe("Rank.all", () => {
  it("returns all the ranks", () => {
    expect(Rank.all()).toEqual(Seq.Indexed([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
  });
});

describe("Rank.show", () => {
  it("returns a string representation of the passed card rank", () => {
    expect(Rank.show(1)).toEqual("A");
    expect(Rank.show(2)).toEqual("2");
    expect(Rank.show(9)).toEqual("9");
    expect(Rank.show(10)).toEqual("10");
    expect(Rank.show(11)).toEqual("J");
    expect(Rank.show(12)).toEqual("Q");
    expect(Rank.show(13)).toEqual("K");
  });
});
