import { Card } from "../card";
import { IPosition } from "../position";
import { Rank } from "../rank";
import { Suit } from "../suit";

export class Foundation implements IPosition {

  public static from(suit: Suit): Foundation {
    return new Foundation(suit, null);
  }

  private constructor(
    private readonly suit: Suit,
    private readonly topRank: Rank | null,
  ) {
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
