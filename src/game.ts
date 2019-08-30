import { List } from "immutable";
import { EOL } from "os";

import { Board } from "./board";
import { Move } from "./move";

const quitCommand = "quit";
const helpCommand = "help";
const rulesCommand = "rules";

const helpText =
`Enter two letters to describe your move, indicating the "from" position and the "to" position.
For full rules, enter "${rulesCommand}". To quit, enter "${quitCommand}".`;

const rulesText =
`The game board consists of four Foundations (labelled a to d), nine Columns (e to m), and a Reserve (n to t).
The aim of the game is to complete the Foundations in ascending order, from Ace through to King in each suit.
In each Column, only the last card (nearer the bottom of the screen) is available for play.
All cards in the Reserve are available to play; however cards cannot be moved back into the Reserve once played.
Any empty Foundation can be filled with the Ace of its suit; and thereafter each Foundation must then be built up
in ascending sequence from 2 through to King.
Cards can be played to Columns only one at a time, in descending order in alternating colours. For example,
if the last card in a Column is a 4${"\u{2661}"}, then either the 3${"\u{2663}"} or the 3${"\u{2660}"} could be added.
You have won when the top card of each Foundation is a King.`;

const clearScreen = "\x1b[2J\x1b[1;1H";

// Immutably represents the state of a game at a given point in time. The Game contains a Board state, as well
// as messages intended for display to the user. A Game has a string representation intended for
// displaying in a terminal, representing that game state.
export class Game {

  // Creates a new game from the given board. Prompt is a string such as "> " that will be prepended
  // when echoing user input. (The Game class is not actually responsible for input/output, but needs to
  // know which prompt character to use to render a the complete string representation of the
  // current game state.)
  public static from(board: Board, prompt: string): Game {
    return new Game(board, false, List<string>(), prompt);
  }

  private constructor(
    private readonly board: Board,
    public readonly over: boolean,
    private readonly messages: List<string>,
    private readonly prompt: string,
  ) {
  }

  // Where command is user input, returns a new Game state that reflects that input.
  public apply(command: string): Game {
    const { board, prompt } = this;
    const promptedMessage = prompt + command;

    switch (command) {
    case quitCommand:
      return this.finalize().addMessages(promptedMessage, "Bye!");
    case helpCommand:
      return this.addMessages(promptedMessage, helpText);
    case rulesCommand:
      return this.addMessages(promptedMessage, rulesText);
    }

    const move = Move.from(command);
    if (move === null) {
      return this.addMessages(promptedMessage, "Invalid move.", helpText);
    }
    const newBoard = board.apply(move);
    if (newBoard === null) {
      return this.addMessages(promptedMessage, "Invalid move. Try again.");
    }

    switch (newBoard.victoryState()) {
    case "won":
      return this.updateBoard(newBoard).finalize().resetMessages("You won! Congratulations!");
    case "lost":
      return this.updateBoard(newBoard).finalize().resetMessages("No legal moves are available. You lost.");
    }

    return this.updateBoard(newBoard).resetMessages();
  }

  public toString(): string {
    return [clearScreen, this.board.toString(), this.formattedMessages()].join(EOL);
  }

  private addMessages(...messages: string[]): Game {
    return new Game(this.board, this.over, this.messages.push(...messages), this.prompt);
  }

  private resetMessages(...messages: string[]): Game {
    return new Game(this.board, this.over, List(messages), this.prompt);
  }

  private updateBoard(board: Board): Game {
    return new Game(board, this.over, this.messages, this.prompt);
  }

  private finalize(): Game {
    return new Game(this.board, true, this.messages, this.prompt);
  }

  private formattedMessages(): string {
    return this.messages.isEmpty() ? "" : EOL + this.messages.join(EOL);
  }
}
