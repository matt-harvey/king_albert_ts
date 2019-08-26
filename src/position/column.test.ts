import { List } from "immutable";

import { Card } from "../card";
import { Column } from "./column";

const label = 2;

describe("Column.from", () => {
  const cards = List([Card.from(3, "spades"), Card.from(11, "diamonds")]);
  const column = Column.from(label, cards);

  it("returns a column with the passed label", () => {
    expect(column.label).toEqual(2);
  });
  it("returns a column containing the passed cards", () => {
    expect(column.cards).toEqual(List([Card.from(3, "spades"), Card.from(11, "diamonds")]));
  });
});

describe("Column#canGive", () => {
  it("returns truthy if and only if the column is not empty", () => {
    const cards = List([Card.from(3, "spades"), Card.from(11, "diamonds")]);
    expect(Column.from(label, cards).canGive()).toBeTruthy();
    expect(Column.from(label, List<Card>()).canGive()).toBeFalsy();
  });
});

describe("Column#canReceive", () => {
  describe("when the column is empty", () => {
    it("always returns truthy", () => {
      const column = Column.from(label, List<Card>());
      expect(column.canReceive(Card.from(12, "hearts"))).toBeTruthy();
    });
  });
  describe("when the column is nonempty", () => {
    it("returns truthy if and only if the passed card differs in color from, and ranks 1 below, the top card", () => {
      const cards = List([Card.from(3, "spades"), Card.from(11, "diamonds")]);
      const column = Column.from(label, cards);
      expect(column.canReceive(Card.from(10, "hearts"))).toBeFalsy();
      expect(column.canReceive(Card.from(10, "clubs"))).toBeTruthy();
      expect(column.canReceive(Card.from(11, "clubs"))).toBeFalsy();
      expect(column.canReceive(Card.from(12, "clubs"))).toBeFalsy();
      expect(column.canReceive(Card.from(9, "clubs"))).toBeFalsy();
      expect(column.canReceive(Card.from(10, "spades"))).toBeTruthy();
      expect(column.canReceive(Card.from(11, "spades"))).toBeFalsy();
      expect(column.canReceive(Card.from(12, "spades"))).toBeFalsy();
      expect(column.canReceive(Card.from(9, "spades"))).toBeFalsy();
      expect(column.canReceive(Card.from(10, "diamonds"))).toBeFalsy();
      expect(column.canReceive(Card.from(10, "hearts"))).toBeFalsy();
      expect(column.canReceive(Card.from(11, "diamonds"))).toBeFalsy();
    });
  });
});

describe("Column#give", () => {
  describe("when the column is empty", () => {
    it("throws an error", () => {
      const column = Column.from(label, List<Card>());
      expect(() => column.give()).toThrow("Cannot give card from empty column");
    });
  });
  describe("when the column is nonempty", () => {
    const cards = List([Card.from(3, "spades"), Card.from(11, "diamonds"), Card.from(7, "hearts")]);
    const column = Column.from(label, cards);
    const [card, newColumn] = column.give();

    it("returns the top card of the column", () => {
      const { rank, suit } = card;
      expect(rank).toEqual(7);
      expect(suit).toEqual("hearts");
    });
    it("returns a new column that excludes the given card", () => {
      expect(newColumn.cards.map(card => [card.rank, card.suit])).toEqual(List([[3, "spades"], [11, "diamonds"]]));
    });
  });
});

describe("Column#receive", () => {
  it("returns a new column containing the received card", () => {
    const cards = List([Card.from(3, "spades"), Card.from(11, "diamonds")]);
    const column = Column.from(label, cards);
    const newColumn = column.receive(Card.from(5, "clubs"));
    expect(newColumn.cards.map(card => [card.rank, card.suit])).
      toEqual(List([[3, "spades"], [11, "diamonds"], [5, "clubs"]]));
  });
});

describe("Column#size", () => {
  it("returns the number of cards in the column", () => {
    const cards = List([Card.from(3, "spades"), Card.from(11, "diamonds")]);
    const column = Column.from(label, cards);
    expect(column.size()).toEqual(2);
  });
});
