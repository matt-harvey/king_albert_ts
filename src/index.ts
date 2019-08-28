import * as readline from "readline";

import { Board } from "./board";
import { Card } from "./card";
import { Deck } from "./deck";
import { Move } from "./move";

async function main() {
  const clearScreen = "\x1b[2J\x1b[1;1H";
  const deck = Deck.create().shuffle();
  let board = Board.from(deck);

  const helpCommands = ["help", "?"];
  const quitCommands = ["quit", "exit"];
  const completableCommands = [...helpCommands, ...quitCommands];
  const completer = (line: string) => {
    const hits = completableCommands.filter(command => command.startsWith(line));
    // Show all completions if none found
    const completions = (hits.length === 0 ? completableCommands : hits);
    return [completions, line];
  };

  const { stdin: input, stdout: output } = process;
  const cli = readline.createInterface({ completer, input, output });

  const showBoardWithPrompt = () => {
    console.log(`${clearScreen}${board}`);
    cli.prompt();
  };
  const showHelpWithPrompt = () => {
    console.log(`Enter two letters to describe your desired move, indicating the "from" position, ` +
                `followed by the "to" position. To quit, enter "quit".`);
    cli.prompt();
  };

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
    if (helpCommands.includes(input)) {
      showHelpWithPrompt();
      return;
    }
    const move = Move.from(input);
    if (move === null) {
      console.log("Invalid move.");
      showHelpWithPrompt();
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
    if (board.victoryState() === "won") {
      console.log("Congratulations, you won!");
      cli.close();
      process.exit();
      return;
    }
    return;
  });

}

main();
