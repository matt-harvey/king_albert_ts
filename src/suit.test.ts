import { List } from "immutable";

import { Suit } from "./suit";

describe("Suit.all", () => {
  it("returns all the suits", () => {
    expect(Suit.all()).toEqual(List(["spades", "hearts", "diamonds", "clubs"]));
  });
});

describe("Suit.color", () => {
  it("returns the color of the passed suit", () => {
    expect(Suit.color("spades")).toEqual("black");
    expect(Suit.color("hearts")).toEqual("red");
    expect(Suit.color("diamonds")).toEqual("red");
    expect(Suit.color("clubs")).toEqual("black");
  });
});

describe("Suit.show", () => {
  it("returns a single-glyph Unicode string symbolizing that suit", () => {
    expect(Suit.show("spades")).toEqual("♠");
    expect(Suit.show("hearts")).toEqual("♡");
    expect(Suit.show("diamonds")).toEqual("♢");
    expect(Suit.show("clubs")).toEqual("♣");
  });
});
