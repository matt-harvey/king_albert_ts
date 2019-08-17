import { List } from "immutable";

import { Card } from "../card";
import { Label } from "../label";
import { Position } from "../position";
import { Suit } from "../suit";

export class Column extends Position {

  public static from(label: Label, cards: List<Card>): Column {
    return new Column(label, cards);
  }

  private constructor(
    label: Label,
    public readonly cards: List<Card>,
  ) {
    super(label);
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
    return [card, Column.from(this.label, cards.pop())];
  }

  public receive(card: Card): Column {
    return Column.from(this.label, this.cards.push(card));
  }

  public size(): number {
    return this.cards.size;
  }
}
