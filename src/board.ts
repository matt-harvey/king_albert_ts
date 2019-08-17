import { Collection, List, Map, Range, Repeat, Seq } from "immutable";
import { EOL } from "os";

import { Card } from "./card";
import { Deck } from "./deck";
import { Label } from "./label";
import { Position } from "./position";
import { Column } from "./position/column";
import { Foundation } from "./position/foundation";
import { SpotInHand } from "./position/spot-in-hand";
import { Suit } from "./suit";
import { stringify, transposeAndFill } from "./util";

const columnWidth = 5;
const numFoundations = Suit.all().size;
const numColumns = 9;
const handSize = 7;
const displayWidth = numColumns * columnWidth + 1;

export class Board {

  public static from(deck: Deck): Board {
    const foundations = createFoundations(Label.min);
    const [columns, reducedDeck] = createColumns(Label.min + foundations.size, deck);
    const [hand, _] = createHand(Label.min + foundations.size + columns.size, reducedDeck);
    return new Board(foundations, columns, hand);
  }

  private readonly allPositions: List<Position>;

  private constructor(
    private readonly foundations: List<Foundation>,
    private readonly columns: List<Column>,
    private readonly hand: List<SpotInHand>,
  ) {
    this.allPositions = foundations.concat(columns).concat(hand);
  }

  public toString(): string {
    const { foundations, columns, hand } = this;

    // Format Positions for printing
    const printableFoundations = foundations.map(stringify);
    const printableHand = hand.map(stringify);
    const printableColumns = columns.map(column => column.cards.map(stringify));
    const rows = transposeAndFill(printableColumns, " ");
    const printableRows = rows.map(formatCells);

    // Format labels for the positions
    const foundationsLabels = printableLabels(foundations);
    const columnsLabels = printableLabels(columns);
    const handLabels = printableLabels(hand);

    // Format divider
    const divider = EOL + "-".repeat(displayWidth) + EOL;

    // Put it all together
    const labelledFoundations = [foundationsLabels, printableFoundations].map(formatCells).join(divider);
    const labelledColumns = [formatCells(columnsLabels), printableRows.join(EOL)].join(divider);
    const labelledHand = [handLabels, printableHand].map(formatCells).join(divider);
    return [labelledFoundations, labelledColumns, labelledHand].join(EOL + EOL);
  }

  private positionAt(label: Label): Position | null {
    return this.allPositions.get(label, null);
  }
}

function printableLabels(positions: Collection<number, Position>): Collection<number, string> {
  return positions.map(position => Label.show(position.label));
}

function createFoundations(startLabel: Label): List<Foundation> {
  return Suit.all().map((suit, i) => Foundation.from(startLabel + i, suit));
}

function createHand(startLabel: Label, deck: Deck): [List<SpotInHand>, Deck] {
  const [cards, newDeck] = deck.deal(handSize);
  const hand = cards.map((card, i) => SpotInHand.from(startLabel + i, card as Card));
  return [hand, newDeck];
}

function createColumns(startLabel: Label, deck: Deck): [List<Column>, Deck] {
  return Range(0, numColumns).reduce(([accumulatedColumns, reducedDeck], num) => {
    const [column, newDeck] = createColumn(startLabel + num, reducedDeck, num + 1);
    return [accumulatedColumns.push(column), newDeck];
  }, [List<Column>(), deck]);
}

function createColumn(label: Label, deck: Deck, numCards: number): [Column, Deck] {
  const [cards, newDeck] = deck.deal(numCards);
  const column = Column.from(label, cards);
  return [column, newDeck];
}

function formatCells(cells: Collection<number, string>): string {
  const padder = " ";
  return cells.map(cell => cell.padStart(columnWidth, padder)).join("").padStart(displayWidth - 1, padder) + padder;
}
