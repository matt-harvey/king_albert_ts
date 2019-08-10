import { Card } from "../card";
import { IPosition } from "../position";

export class SpotInHand implements IPosition {

  public static from(card: Card): SpotInHand {
    return new SpotInHand(card);
  }

  private constructor(
    private readonly card: Card | null,
  ) {
  }

  public canGive(): boolean {
    return true;
  }

  public canReceive(card: Card): boolean {
    return false;
  }

  public give(): [Card, SpotInHand] {
    const { card } = this;
    if (card === null) {
      throw new Error("Cannot call give on empty SpotInHand");
    }
    return [card, new SpotInHand(null)];
  }
}
