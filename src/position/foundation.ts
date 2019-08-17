import { Card } from "../card";
import { Label } from "../label";
import { Position } from "../position";
import { Rank } from "../rank";
import { Suit } from "../suit";

export class Foundation extends Position {

  public static from(label: Label, suit: Suit): Foundation {
    return new Foundation(label, suit, null);
  }

  private constructor(
    label: Label,
    private readonly suit: Suit,
    private readonly topRank: Rank | null,
  ) {
    super(label);
  }

  public canGive(): boolean {
    return false;
  }

  public canReceive(card: Card): boolean {
    const { topRank, suit } = this;
    return (
      card.suit === suit &&
      (topRank === null || card.rank === topRank + 1)
    );
  }

  public give(): never {
    throw new Error("should not be called");
  }

  public receive(card: Card): Foundation {
    return new Foundation(this.label, card.suit, card.rank);
  }

  public toString(): string {
    const topCard = this.topCard();
    if (topCard === null) {
      return Suit.show(this.suit);
    }
    return topCard.toString();
  }

  private topCard(): Card | null {
    const { suit, topRank } = this;
    if (topRank === null) {
      return null;
    }
    return Card.from(topRank, suit);
  }

}
