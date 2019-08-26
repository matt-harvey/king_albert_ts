import { Card } from "../card";
import { SpotInHand } from "./spot-in-hand";

describe("SpotInHand.from", () => {
  const label = 2;
  const card = Card.from(9, "diamonds");
  const spotInHand = SpotInHand.from(label, card);

  it("returns a SpotInHand with the passed label", () => {
    expect(spotInHand.label).toEqual(2);
  });
  it("returns a SpotInHand containing the passed cards", () => {
    expect(spotInHand.toString()).toEqual("9♢");
  });
});

describe("SpotInHand#canGive", () => {
  const label = 2;
  const card = Card.from(9, "diamonds");

  it("returns true if and only if the spot is nonempty", () => {
    const nonemptySpot = SpotInHand.from(label, card);
    expect(nonemptySpot.canGive()).toBeTruthy();
    const emptySpot = nonemptySpot.give()[1];
    expect(emptySpot.canGive()).toBeFalsy();
  });
});

describe("SpotInHand#canReceive", () => {
  it("always returns false", () => {
    const label = 2;
    const card = Card.from(9, "diamonds");
    const nonemptySpot = SpotInHand.from(label, card);
    const emptySpot = nonemptySpot.give()[1];
    const incomingCards = [Card.from(8, "clubs"), Card.from(10, "diamonds"), Card.from(1, "spades")];
    incomingCards.forEach(incomingCard => {
      expect(nonemptySpot.canReceive(incomingCard)).toBeFalsy();
      expect(emptySpot.canReceive(incomingCard)).toBeFalsy();
    });
  });
});

describe("SpotInHand#give", () => {
  const label = 2;
  const card = Card.from(9, "diamonds");
  const nonemptySpot = SpotInHand.from(label, card);
  const emptySpot = nonemptySpot.give()[1];

  describe("when the SpotInHand is empty", () => {
    it("throws an error", () => {
      expect(() => emptySpot.give()).toThrow("Cannot call give on empty SpotInHand");
    });
  });

  describe("when the SpotInHand is nonempty", () => {
    const [givenCard, newSpot] = nonemptySpot.give();

    it("returns the card in the spot", () => {
      expect(givenCard).toEqual(Card.from(9, "diamonds"));
    });
    it("returns a new, empty spot", () => {
      expect(newSpot).toEqual(emptySpot);
    });
  });
});

describe("SpotInHand#receive", () => {
  it("always throws", () => {
    const label = 2;
    const card = Card.from(9, "diamonds");
    const nonemptySpot = SpotInHand.from(label, card);
    const emptySpot = nonemptySpot.give()[1];
    const incomingCards = [Card.from(8, "clubs"), Card.from(10, "diamonds"), Card.from(1, "spades")];
    incomingCards.forEach(incomingCard => {
      expect(() => nonemptySpot.receive(incomingCard)).toThrow("should not be called");
      expect(() => emptySpot.receive(incomingCard)).toThrow("should not be called");
    });
  });
});

describe("SpotInHand#toString", () => {
  const label = 2;
  const card = Card.from(9, "diamonds");
  const nonemptySpot = SpotInHand.from(label, card);
  const emptySpot = nonemptySpot.give()[1];

  describe("when the spot is empty", () => {
    it("returns an empty string", () => {
      expect(emptySpot.toString()).toEqual("");
    });
  });
  describe("when the spot is not empty", () => {
    it("returns a human friendly string representation of the SpotInHand, showing the card it holds", () => {
      expect(nonemptySpot.toString()).toEqual("9♢");
    });
  });
});
