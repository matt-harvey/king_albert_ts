import { List, Range } from "immutable";

import { Card } from "./card";
import { Rank } from "./rank";
import { Suit } from "./suit";

export class Deck {

  // Creates a new, not-yet-shuffled deck containing a card for each rank/suit combination.
  public static create(): Deck {
    const cards = Suit.all().reduce((cards, suit) => cards.push(...createCardsOfSuit(suit)), List<Card>());
    return new Deck(cards);
  }

  private constructor(
    private readonly cards: List<Card>,
  ) {
  }

  // Randomizes the order of the cards in the deck.
  public shuffle(): Deck {
    const cards = this.cards.sortBy(Math.random);
    return new Deck(cards);
  }

  // Deals cards from the deck, returning the list of dealt cards and the new, reduced deck.
  public deal(numCards: number): [List<Card>, Deck] {
    const { cards } = this;
    const newCards = cards.takeLast(numCards);
    const newDeck = new Deck(cards.skipLast(numCards));
    return [newCards, newDeck];
  }
}

function createCardsOfSuit(suit: Suit): List<Card> {
  return Rank.all().reduce((cards, rank) => cards.push(Card.from(rank, suit)), List<Card>());
}
