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

  public dealN(numCards: number): [List<Card>, Deck] {
    // FIXME This could surely be more efficient.
    return Range(0, numCards).reduce(([cards, deck]: [List<Card>, Deck]) => {
      const [card, reducedDeck] = deck.deal();
      if (card === null) {
        return [cards, deck];
      }
      return [cards.push(card), reducedDeck];
    }, [List<Card>(), this]);
  }

  private deal(): [Card | null, Deck] {
    const { cards } = this;
    const reducedCards = cards.pop();
    const deck = new Deck(reducedCards);
    return [cards.last(null), deck];
  }
}

function createCardsOfSuit(suit: Suit): List<Card> {
  return Rank.all().reduce((cards, rank) => cards.push(Card.from(rank, suit)), List<Card>());
}
