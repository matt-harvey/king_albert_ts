import readline from "readline-promise";

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
    const completions = completableCommands.filter(command => command.startsWith(line));
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

  cli.forEach(async line => {
    if (quitCommands.includes(line)) {
      const answer = await cli.questionAsync("Are you sure you want to quit (y/N)? ");
      if (answer.match(/y(es)?/i)) {
        cli.close();
        return;
      }
      cli.prompt();
      return;
    }
    if (helpCommands.includes(line)) {
      showHelpWithPrompt();
      return;
    }
    const move = Move.from(line);
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
    switch (board.victoryState()) {
    case "won":
      console.log("Congratulations, you won!");
      cli.close();
      return;
    case "lost":
      console.log("You have no legal moves left. You lost! Too bad!");
      cli.close();
      return;
    }
    return;
  });

  cli.on("close", () => {
    process.exit();
  });
}

main();
