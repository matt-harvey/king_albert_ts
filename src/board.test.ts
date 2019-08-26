import { EOL } from "os";

import { Board } from "./board";
import { Deck } from "./deck";

describe("Board#toString", () => {
  it("returns a human-presentable string representation of the board", () => {
    const deck = Deck.create();
    // For testability, we don't shuffle the deck.
    const board = Board.from(deck);
    // Lines are joined from array to avoid frustration of editor automatically trimming trailing
    // whitespace.
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
