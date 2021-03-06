import readline, { Interface as ReadlineInterface } from "readline-promise";

import { Board } from "./board";
import { Card } from "./card";
import { Deck } from "./deck";
import { Game } from "./game";
import { Move } from "./move";

const prompt = "> ";

function createReadlineInterface(): ReadlineInterface {
  const { stdin: input, stdout: output } = process;
  const cli = readline.createInterface({ input, output, prompt });
  cli.on("close", process.exit);
  return cli;
}

function createGame(): Game {
  const deck = Deck.create().shuffle();
  const board = Board.from(deck);
  return Game.from(board, prompt);
}

async function main() {
  const game = createGame();
  const cli = createReadlineInterface();

  console.log(game.toString());
  cli.prompt();

  cli.reduce((gameSoFar, input) => {
    const updatedGame = gameSoFar.apply(input);
    console.log(updatedGame.toString());

    if (updatedGame.over) {
      cli.close();
      process.exit();
    } else {
      cli.prompt();
    }
    return updatedGame;
  }, game);
}

main();
