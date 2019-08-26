import { List } from "immutable";

import { Card } from "./card";
import { Deck } from "./deck";

describe("Deck.create", () => {
  it("creates a new deck containing 52 cards, one for rank/suit combination", () => {
    const deck = Deck.create();
    const [cards, _] = deck.deal(52);
    expect(cards.map(card => [card.rank, card.suit])).toEqual(List([
      [1, "spades"], [2, "spades"], [3, "spades"], [4, "spades"], [5, "spades"], [6, "spades"],
      [7, "spades"], [8, "spades"], [9, "spades"], [10, "spades"], [11, "spades"], [12, "spades"],
      [13, "spades"],
      [1, "hearts"], [2, "hearts"], [3, "hearts"], [4, "hearts"], [5, "hearts"], [6, "hearts"],
      [7, "hearts"], [8, "hearts"], [9, "hearts"], [10, "hearts"], [11, "hearts"], [12, "hearts"],
      [13, "hearts"],
      [1, "diamonds"], [2, "diamonds"], [3, "diamonds"], [4, "diamonds"], [5, "diamonds"], [6, "diamonds"],
      [7, "diamonds"], [8, "diamonds"], [9, "diamonds"], [10, "diamonds"], [11, "diamonds"], [12, "diamonds"],
      [13, "diamonds"],
      [1, "clubs"], [2, "clubs"], [3, "clubs"], [4, "clubs"], [5, "clubs"], [6, "clubs"],
      [7, "clubs"], [8, "clubs"], [9, "clubs"], [10, "clubs"], [11, "clubs"], [12, "clubs"],
      [13, "clubs"],
    ]));
  });
});

describe("Deck#shuffle", () => {
  it("returns a new deck containing the same cards as the original deck, but in randomized order", () => {
    const deck = Deck.create();
    const unshuffledCards = deck.deal(52)[0];
    const shuffledCards = deck.shuffle().deal(52)[0];
    expect(shuffledCards.sort()).toEqual(unshuffledCards.sort());
  });
});

describe("Deck#deal", () => {
  const deck = Deck.create();

  describe("when the deck contains fewer cards than the passed number N", () => {
    const subject = deck.deal(2);
    const dealtCards = subject[0];
    const comparableDealtCards = dealtCards.map(card => List([card.rank, card.suit])).toSet();
    const returnedDeck = subject[1];
    const remainingCards = returnedDeck.deal(100000)[0];
    const comparableRemainingCards = remainingCards.map(card => List([card.rank, card.suit])).toSet();

    it("returns a list of N cards", () => {
      expect(dealtCards.size).toEqual(2);
    });
    it("returns a deck that does not contain the dealt cards", () => {
      expect(comparableDealtCards.intersect(comparableRemainingCards).isEmpty()).toBeTruthy();
    });
  });

  describe("when the deck contains the same number of cards as the passed number", () => {
    const subject = deck.deal(52);
    const dealtCards = subject[0];
    const returnedDeck = subject[1];
    const remainingCards = returnedDeck.deal(100000)[0];

    it("deals N cards", () => {
      expect(dealtCards.size).toEqual(52);
    });
    it("returns an empty deck", () => {
      expect(remainingCards.isEmpty()).toBeTruthy();
    });
  });

  describe("when the deck contains more cards than the passed number", () => {
    const subject = deck.deal(53);
    const dealtCards = subject[0];
    const returnedDeck = subject[1];
    const remainingCards = returnedDeck.deal(100000)[0];

    it("deals only the number of cards that are in the deck", () => {
      expect(dealtCards.size).toEqual(52);
    });
    it("returns an empty deck", () => {
      expect(remainingCards.isEmpty()).toBeTruthy();
    });
  });
});
