import { List } from "immutable";
import { EOL } from "os";

import { Board } from "./board";
import { Deck } from "./deck";
import { Move } from "./move";

// For testability, we don't shuffle the deck.
const deck = Deck.create();
const board = Board.from(deck);

describe("Board#apply", () => {
  describe("when passed a move that is not permitted", () => {
    it("returns null", () => {
      expect(board.apply({ source: 7, destination: 9 })).toEqual(null);
      expect(board.apply({ source: 0, destination: 9 })).toEqual(null);
    });
  });
  describe("when passed a move that does not identify valid source or destination positions", () => {
    it("returns null", () => {
      expect(board.apply({ source: -1, destination: 9 })).toEqual(null);
      expect(board.apply({ source: 59, destination: 9 })).toEqual(null);
      expect(board.apply({ source: 3, destination: -1 })).toEqual(null);
      expect(board.apply({ source: 3, destination: 59 })).toEqual(null);
    });
  });
  describe("when passed a move that is permitted", () => {
    it("returns a new board that reflects the application of that move", () => {
      const move = { source: 16, destination: 10 };
      const newBoard = board.apply(move);
      // Lines are joined from array to avoid frustration of editor automatically trimming trailing whitespace.
      expect(`${newBoard}`).toEqual([
        "                             a    b    c    d ",
        "----------------------------------------------",
        "                             ♠    ♡    ♢    ♣ ",
        "",
        "    e    f    g    h    i    j    k    l    m ",
        "----------------------------------------------",
        "   K♣   J♣   8♣   4♣   Q♢   6♢   Q♡   4♡   8♠ ",
        "        Q♣   9♣   5♣   K♢   7♢   K♡   5♡   9♠ ",
        "            10♣   6♣   A♣   8♢   A♢   6♡  10♠ ",
        "                  7♣   2♣   9♢   2♢   7♡   J♠ ",
        "                       3♣  10♢   3♢   8♡   Q♠ ",
        "                            J♢   4♢   9♡   K♠ ",
        "                                 5♢  10♡   A♡ ",
        "                                 4♠   J♡   2♡ ",
        "                                           3♡ ",
        "",
        "              n    o    p    q    r    s    t ",
        "----------------------------------------------",
        "             A♠   2♠   3♠        5♠   6♠   7♠ ",
      ].join(EOL));
    });
  });
});

describe("Board#permittedMoves", () => {
  it("returns all the moves that are permissible for this board", () => {
    expect(board.permittedMoves()).toEqual(List([
      Move.from("gj"),
      Move.from("gl"),
      Move.from("jf"),
      Move.from("lf"),
      Move.from("na"),
      Move.from("om"),
      Move.from("qk"),
    ]));
  });
});

describe("Board#toString", () => {
  it("returns a human-presentable string representation of the board", () => {
    // Lines are joined from array to avoid frustration of editor automatically trimming trailing whitespace.
    expect(board.toString()).toEqual([
      "                             a    b    c    d ",
      "----------------------------------------------",
      "                             ♠    ♡    ♢    ♣ ",
      "",
      "    e    f    g    h    i    j    k    l    m ",
      "----------------------------------------------",
      "   K♣   J♣   8♣   4♣   Q♢   6♢   Q♡   4♡   8♠ ",
      "        Q♣   9♣   5♣   K♢   7♢   K♡   5♡   9♠ ",
      "            10♣   6♣   A♣   8♢   A♢   6♡  10♠ ",
      "                  7♣   2♣   9♢   2♢   7♡   J♠ ",
      "                       3♣  10♢   3♢   8♡   Q♠ ",
      "                            J♢   4♢   9♡   K♠ ",
      "                                 5♢  10♡   A♡ ",
      "                                      J♡   2♡ ",
      "                                           3♡ ",
      "",
      "              n    o    p    q    r    s    t ",
      "----------------------------------------------",
      "             A♠   2♠   3♠   4♠   5♠   6♠   7♠ ",
    ].join(EOL));
  });
});
