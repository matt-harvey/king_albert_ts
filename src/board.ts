import { List, Range } from "immutable";

import { Card } from "./card";
import { Deck } from "./deck";
import { IPosition } from "./position";
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

  public toString(): string {
    // FIXME DRY up the "padString"/"join(gutter)" stuff, as well as position label sequences.
    const { foundations, columns, hand } = this;
    const positionWidth = 3;
    const gutter = "  ";
    const printableFoundations = foundations.map(padPosition).join(gutter);
    const printableHand = hand.map(padPosition).join(gutter);
    const maxColumnSize = columns.reduce((size, column) => Math.max(size, column.size()), 0);
    const printableColumns = columns.map(column => {
      const shortfall = column.size() - maxColumnSize;
      const extras = Range(0, shortfall).map(_ => padString(""));
      return column.cards.map(card => padString(card.toString())).concat(extras);
    });
    const printableRows = Range(0, maxColumnSize).reduce((rows, n) => {
      const row = printableColumns.map(printableColumn => printableColumn.get(n));
      return rows.push(row as List<string>);
    }, List<List<string>>());
    const printableRowStrings = printableRows.map(row => row.join(gutter));
    // FIXME What about cross-platform newlines?

    return `
                         ${["a", "b", "c", "d"].map(padString).join(gutter)}
____________________________________________
                          ${printableFoundations}

${["e", "f", "g", "h", "i", "j", "k", "l", "m"].map(padString).join(gutter)}
____________________________________________

${printableRowStrings.join("\n")}

${["n", "o", "p", "q", "r", "s", "t"].map(padString).join(gutter)}
____________________________________________
${printableHand}
`;
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

function padPosition(position: IPosition): string {
  return padString(position.toString());
}

function padString(str: string): string {
  return str.padStart(3, " ");
}
