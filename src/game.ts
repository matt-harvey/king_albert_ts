import { List } from "immutable";
import { EOL } from "os";

import { Board } from "./board";
import { Move } from "./move";

const quitCommand = "quit";
const helpCommand = "help";

const helpText = `Enter two letters to describe your desired move, indicating the "from" position, ` +
  `followed by the "to" position. To quit, enter "${quitCommand}".`;

const clearScreen = "\x1b[2J\x1b[1;1H";

export class Game {

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

  public apply(command: string): Game {
    const { board, prompt } = this;
    const promptedMessage = prompt + command;

    switch (command) {
    case quitCommand:
      return this.finalize().addMessages(promptedMessage, "Bye!");
    case helpCommand:
      return this.addMessages(promptedMessage, helpText);
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
