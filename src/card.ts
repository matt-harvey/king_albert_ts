import { List } from "immutable";

import { Color } from "./color";
import { Rank } from "./rank";
import { Suit } from "./suit";

export class Card {

  public static from(rank: Rank, suit: Suit): Card {
    return new Card(rank, suit);
  }

  private constructor(
    public readonly rank: Rank,
    public readonly suit: Suit,
  ) {
  }

  public color(): Color {
    return Suit.color(this.suit);
  }

  public toString(): string {
    const { rank, suit } = this;
    return Rank.show(rank) + Suit.show(suit);
  }
}
