import { Card } from "../card";
import { Label } from "../label";
import { Position } from "../position";
import { Rank } from "../rank";
import { Suit } from "../suit";

// Represents a position in the playing area on which the user builds cards in a single suit, in ascending order.
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
    if (card.suit !== this.suit) {
      return false;
    }
    const { topRank } = this;
    const requiredRank = (topRank === null ? 1 : topRank + 1);
    return card.rank === requiredRank;
  }

  public give(): never {
    throw new Error("should not be called");
  }

  public receive(card: Card): Foundation {
    return new Foundation(this.label, card.suit, card.rank);
  }

  public isComplete(): boolean {
    return this.topRank === Rank.max;
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
