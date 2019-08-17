import { Command, flags } from "@oclif/command";

import { Board } from "./board";
import { Card } from "./card";
import { Deck } from "./deck";

class Albertus extends Command {
  public static description = "describe the command here";

  public static flags = {
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
  };

  public static args = [{ name: "file" }];

  public async run() {
    const deck = Deck.create().shuffle();
    const board = Board.from(deck);
    console.log(board.toString());
  }
}

export = Albertus;
