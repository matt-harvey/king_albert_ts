import { List, Range } from "immutable";

import { Card } from "./card";
import { Rank } from "./rank";
import { Suit } from "./suit";

export class Deck {

  public static create(): Deck {
    const cards = Suit.all().reduce((cards, suit) => cards.push(...createCardsOfSuit(suit)), List<Card>());
    return new Deck(cards);
  }

  private constructor(
    private readonly cards: List<Card>,
  ) {
  }

  public shuffle(): Deck {
    const cards = this.cards.sortBy(Math.random);
    return new Deck(cards);
  }

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
