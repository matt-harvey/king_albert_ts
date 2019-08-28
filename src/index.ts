import * as readline from "readline";

import { Board } from "./board";
import { Card } from "./card";
import { Deck } from "./deck";
import { Move } from "./move";

async function main() {
  const clearScreen = "\x1b[2J\x1b[1;1H";
  const deck = Deck.create().shuffle();
  let board = Board.from(deck);

  const quitCommands = ["quit", "exit"];
  const completableCommands = [...quitCommands];
  const completer = (line: string) => {
    const hits = completableCommands.filter(command => command.startsWith(line));
    // Show all completions if none found
    const completions = (hits.length === 0 ? completableCommands : hits);
    return [completions, line];
  };

  const { stdin: input, stdout: output } = process;
  const cli = readline.createInterface({ completer, input, output });

  const showBoard = () => console.log(`${clearScreen}${board}`);
  const showBoardWithPrompt = () => { showBoard(); cli.prompt(); };

  showBoardWithPrompt();

  cli.on("line", input => {
    if (quitCommands.includes(input)) {
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
    showBoardWithPrompt();
    return;
  });

}

main();
