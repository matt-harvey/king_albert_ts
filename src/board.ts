import { Collection, List, Map, Range, Repeat, Seq } from "immutable";
import { EOL } from "os";

import { Card } from "./card";
import { Deck } from "./deck";
import { Label } from "./label";
import { Move } from "./move";
import { Position } from "./position";
import { Column } from "./position/column";
import { Foundation } from "./position/foundation";
import { SpotInHand } from "./position/spot-in-hand";
import { Suit } from "./suit";
import { stringify, transposeAndFill } from "./util";
import { VictoryState } from "./victory-state";

const columnWidth = 5;
const numFoundations = Suit.all().size;
const numColumns = 9;
const handSize = 7;
const displayWidth = numColumns * columnWidth + 1;
const foundationsRange = makeRange(Label.min, numFoundations);
const columnsRange = makeRange(foundationsRange.last(0) + 1, numColumns);
const handRange = makeRange(columnsRange.last(0) + 1, handSize);

export class Board {

  public static from(deck: Deck): Board {
    const foundations = createFoundations(foundationsRange.first());
    const [columns, reducedDeck] = createColumns(columnsRange.first(), deck);
    const [hand, _] = createHand(handRange.first(), reducedDeck);
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

  public apply(move: Move): Board | null {
    const { source, destination } = move;
    const sourcePosition = this.positionAt(source);
    const destinationPosition = this.positionAt(destination);
    if (sourcePosition === null || destinationPosition === null) {
      return null;
    }
    if (!sourcePosition.canGive()) {
      return null;
    }
    const [card, revisedSourcePosition] = sourcePosition.give();
    if (!destinationPosition.canReceive(card)) {
      return null;
    }
    const revisedDestinationPosition = destinationPosition.receive(card);
    const positions = this.allPositions.set(source, revisedSourcePosition).set(destination, revisedDestinationPosition);
    const foundations = slicePositions<Foundation>(positions, foundationsRange);
    const columns = slicePositions<Column>(positions, columnsRange);
    const hand = slicePositions<SpotInHand>(positions, handRange);
    return new Board(foundations, columns, hand);
  }

  public permittedMoves(): List<Move> {
    const { allPositions } = this;
    return allPositions.reduce((moves, sourcePosition) => {
      return allPositions.reduce((movesFromThisSource, destinationPosition) => {
        if (!sourcePosition.canGive() || !destinationPosition.canReceive(sourcePosition.give()[0])) {
          return movesFromThisSource;
        }
        return movesFromThisSource.push({ source: sourcePosition.label, destination: destinationPosition.label });
      }, moves);
    }, List<Move>());
  }

  public toString(): string {
    const { foundations, columns, hand } = this;

    // Format Positions for printing
    const printableFoundations = foundations.map(stringify);
    const printableHand = hand.map(stringify);
    const printableColumns = columns.map(c => c.cards.map(stringify));
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

  public victoryState(): VictoryState {
    if (this.foundations.every(f => f.isComplete())) {
      return "won";
    }
    if (this.permittedMoves().isEmpty()) {
      return "lost";
    }
    return "ongoing";
  }

  private positionAt(label: Label): Position | null {
    return this.allPositions.get(label, null);
  }
}

function printableLabels(positions: Collection<number, Position>): Collection<number, string> {
  return positions.map(p => Label.show(p.label));
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
  return cells.map(c => c.padStart(columnWidth, padder)).join("").padStart(displayWidth - 1, padder) + padder;
}

function makeRange(min: number, size: number): Seq.Indexed<number> {
  return Range(min, min + size);
}

function slicePositions<T extends Position>(positions: List<Position>, range: Seq.Indexed<Label>): List<T> {
  return positions.slice(range.first(0), range.last(0) + 1) as List<T>;
}
