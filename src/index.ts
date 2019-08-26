import { Board } from "./board";
import { Card } from "./card";
import { Deck } from "./deck";

async function main() {
  const deck = Deck.create().shuffle();
  const board = Board.from(deck);
  console.log(board.toString());
}

main();
