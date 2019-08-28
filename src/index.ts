import * as readline from "readline";

import { Board } from "./board";
import { Card } from "./card";
import { Deck } from "./deck";
import { Move } from "./move";

async function main() {
  const clearScreen = "\x1b[2J\x1b[1;1H";
  const deck = Deck.create().shuffle();
  let board = Board.from(deck);

  console.log(clearScreen);
  console.log(board.toString());

  const { stdin: input, stdout: output } = process;
  const cli = readline.createInterface({ input, output });
  cli.setPrompt("> ");
  cli.prompt();
  cli.on("line", input => {
    if (input === "quit" || input === "exit") {
      cli.question("Are you sure you want to quit (y/N)? ", answer => {
        if (answer.match(/y(es)?/i)) {
          cli.close();
          process.exit();
          return;
        }
        cli.prompt();
        return;
      });
      cli.prompt();
      return;
    }
    const move = Move.from(input);
    if (move === null) {
      console.log(`Invalid move. Enter two letters, indicating the "from" position, followed by the "to" position".`);
      cli.prompt();
      return;
    }
    const newBoard = board.apply(move);
    if (newBoard === null) {
      console.log("Invalid move. Try again.");
      cli.prompt();
      return;
    }
    board = newBoard;
    console.log(clearScreen);
    console.log(board.toString());
    cli.prompt();
    return;
  });

}

main();
