import { List } from "immutable";

import { Card } from "../card";
import { IPosition } from "../position";
import { Suit } from "../suit";

export class Column implements IPosition {

  public static from(cards: List<Card>): Column {
    return new Column(cards);
  }

  private constructor(
    private readonly cards: List<Card>,
  ) {
  }

  public canGive(): boolean {
    return !this.cards.isEmpty();
  }

  public canReceive(card: Card): boolean {
    const { cards } = this;
    const topCard = cards.last(null);
    if (topCard === null) {
      return true;
    }
    return card.color() !== topCard.color() && card.rank === topCard.rank - 1;
  }

  public give(): [Card, Column] {
    const { cards } = this;
    const card = cards.last(null) as Card;
    return [card, Column.from(cards.pop())];
  }
}
