import { EOL } from "os";

import { Board } from "./board";
import { Deck } from "./deck";
import { Game } from "./game";
import { Move } from "./move";

// For testability, we don't shuffle the deck.
const deck = Deck.create();
const board = Board.from(deck);
const prompt = "> ";
const game = Game.from(board, prompt);

describe("Game#apply", () => {
  describe("when passed 'quit'", () => {
    const newGame = game.apply("quit");

    it("returns a Game containing the same board, the command with prompt, and a 'farewell message'", () => {
      expect(`${newGame}`).toEqual([
        "\x1b[2J\x1b[1;1H", // clears screen
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
        "",
        "> quit",
        "Bye!",
      ].join(EOL));
    });

    it("returns a Game that is over", () => {
      expect(newGame.over).toBeTruthy();
    });
  });

  describe("when passed 'help'", () => {
    const newGame = game.apply("help");

    it("returns a Game containing the same board, the command with prompt, and a help message", () => {
      expect(`${newGame}`).toEqual([
        "\x1b[2J\x1b[1;1H",
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
        "",
        "> help",
        'Enter two letters to describe your move, indicating the "from" position and the "to" position.',
        'For full rules, enter "rules". To quit, enter "quit".',
      ].join(EOL));
    });

    it("returns a Game that is not over", () => {
      expect(newGame.over).toBeFalsy();
    });
  });

  describe("when the passed command can be parsed as move", () => {
    describe("and the move is legal", () => {
      const newGame = game.apply("na");

      it("returns a Game containing a board that has been updated by the move, and no messages", () => {
        expect(`${newGame}`).toEqual([
          "\x1b[2J\x1b[1;1H",
          "                             a    b    c    d ",
          "----------------------------------------------",
          "                            A♠    ♡    ♢    ♣ ",
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
          "                  2♠   3♠   4♠   5♠   6♠   7♠ ",
          "",
        ].join(EOL));
      });

      it("returns a Game that is not over", () => {
        expect(newGame.over).toBeFalsy();
      });
    });

    describe("but then move is illegal", () => {
      const newGame = game.apply("ml");

      it("returns a Game containing the same board, the command with prompt, and an error message", () => {
        expect(`${newGame}`).toEqual([
          "\x1b[2J\x1b[1;1H",
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
          "",
          "> ml",
          "Invalid move. Try again.",
        ].join(EOL));
      });

      it("returns a Game that is not over", () => {
        expect(newGame.over).toBeFalsy();
      });
    });
  });

  describe("when the passed command is not one of the recognized commands and cannot be parsed as a move", () => {
    const newGame = game.apply("qdf");

    it("returns a Game containing the same board, the command with prompt, an error and a help message", () => {
      expect(`${newGame}`).toEqual([
        "\x1b[2J\x1b[1;1H",
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
        "",
        "> qdf",
        "Invalid move.",
        'Enter two letters to describe your move, indicating the "from" position and the "to" position.',
        'For full rules, enter "rules". To quit, enter "quit".',
      ].join(EOL));
    });

    it("returns a Game that is not over", () => {
      expect(newGame.over).toBeFalsy();
    });
  });
});
