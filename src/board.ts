import { List, Range } from "immutable";

import { Card } from "./card";
import { Deck } from "./deck";
import { Column } from "./position/column";
import { Foundation } from "./position/foundation";
import { SpotInHand } from "./position/spot-in-hand";
import { Suit } from "./suit";

export class Board {

  public static from(deck: Deck): Board {
    const foundations = createFoundations();
    const [hand, reducedDeck] = createHand(deck);
    const [columns, _] = createColumns(reducedDeck);
    return new Board(foundations, columns, hand);
  }

  private constructor(
    private readonly foundations: List<Foundation>,
    private readonly columns: List<Column>,
    private readonly hand: List<SpotInHand>,
  ) {
  }
}

function createFoundations(): List<Foundation> {
  return Suit.all().map(Foundation.from);
}

function createHand(deck: Deck): [List<SpotInHand>, Deck] {
  const [cards, newDeck] = deck.dealN(7);
  const hand = cards.map(card => SpotInHand.from(card as Card));
  return [hand, newDeck];
}

function createColumns(deck: Deck): [List<Column>, Deck] {
  return Range(1, 10).reduce(([accumulatedColumns, reducedDeck], num) => {
    const [column, newDeck] = createColumn(reducedDeck, num);
    return [accumulatedColumns.push(column), newDeck];
  }, [List<Column>(), deck]);
}

function createColumn(deck: Deck, numCards: number): [Column, Deck] {
    const [cards, newDeck] = deck.dealN(numCards);
    const column = Column.from(cards);
    return [column, newDeck];
}
