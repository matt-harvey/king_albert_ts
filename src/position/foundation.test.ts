import { Card } from "../card";
import { Foundation } from "./foundation";

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
