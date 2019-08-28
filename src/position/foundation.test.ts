import { Range } from "immutable";

import { Card } from "../card";
import { Foundation } from "./foundation";
import { Rank } from "../rank";

const label = 2;

describe("Foundation.from", () => {
  it("returns a foundation with the passed label and suit", () => {
    const foundation = Foundation.from(label, "diamonds");
    expect(foundation.label).toEqual(2);
    expect(foundation.toString()).toEqual("♢");
  });
});

describe("Foundation#canGive", () => {
  it("always returns falsy", () => {
    expect(Foundation.from(label, "spades").canGive()).toBeFalsy();
  });
});

describe("Foundation#canReceive", () => {
  describe("when empty", () => {
    it("returns true only when passed the Ace of its suit", () => {
      const foundation = Foundation.from(label, "spades");
      expect(foundation.canReceive(Card.from(1, "spades"))).toBeTruthy();
      expect(foundation.canReceive(Card.from(2, "spades"))).toBeFalsy();
      expect(foundation.canReceive(Card.from(1, "clubs"))).toBeFalsy();
    });
  });
  describe("when not empty", () => {
    it("returns true only when passed the next card of its suit, in ascending order", () => {
      const aceSpades = Card.from(1, "spades");
      const twoSpades = Card.from(2, "spades");
      const foundation = Foundation.from(label, "spades").receive(aceSpades).receive(twoSpades);
      expect(foundation.canReceive(Card.from(3, "clubs"))).toBeFalsy();
      expect(foundation.canReceive(Card.from(3, "spades"))).toBeTruthy();
      expect(foundation.canReceive(Card.from(4, "spades"))).toBeFalsy();
      expect(foundation.canReceive(Card.from(2, "spades"))).toBeFalsy();
    });
  });
});

describe("Foundation#give", () => {
  it("always throws", () => {
    const foundation = Foundation.from(label, "spades");
    expect(() => foundation.give()).toThrow("should not be called");
  });
});

describe("Foundation#receive", () => {
  it("returns a new Foundation with the passed card as its top card", () => {
    const foundation = Foundation.from(label, "spades");
    const card = Card.from(12, "hearts");
    const otherCard = Card.from(9, "diamonds");
    const revisedFoundation = foundation.receive(card);
    expect(revisedFoundation.toString()).toEqual("Q♡");
    expect(revisedFoundation.receive(otherCard).toString()).toEqual("9♢");
  });
});

describe("Foundation#isComplete", () => {
  it("returns truthy if and only if the top card is a King", () => {
    const emptyFoundation = Foundation.from(label, "spades");
    expect(emptyFoundation.isComplete()).toBeFalsy();
    const queenFoundation = Range(1, 13).reduce((foundation, rank) =>
      foundation.receive(Card.from(rank as Rank, "spades")), emptyFoundation);
    expect(queenFoundation.isComplete()).toBeFalsy();
    const kingFoundation = queenFoundation.receive(Card.from(13, "spades"));
    expect(kingFoundation.isComplete()).toBeTruthy();
  });
});

describe("Foundation#toString", () => {
  describe("when the foundation is empty", () => {
    it("returns a human friendly string representation of the foundation, showing its suit only", () => {
      const foundation = Foundation.from(label, "diamonds");
      expect(foundation.toString()).toEqual("♢");
    });
  });
  describe("when the foundation is not empty", () => {
    it("returns a human friendly string representation of the foundation, showing its top card only", () => {
      const card = Card.from(1, "diamonds");
      const otherCard = Card.from(2, "diamonds");
      const foundation = Foundation.from(label, "diamonds").receive(card).receive(otherCard);
      expect(foundation.toString()).toEqual("2♢");
    });
  });
});
