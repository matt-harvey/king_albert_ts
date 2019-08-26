import { Card } from "../card";
import { Label } from "../label";
import { Position } from "../position";

export class SpotInHand extends Position {

  public static from(label: Label, card: Card): SpotInHand {
    return new SpotInHand(label, card);
  }

  private constructor(
    label: Label,
    private readonly card: Card | null,
  ) {
    super(label);
  }

  public canGive(): boolean {
    return this.card !== null;
  }

  public canReceive(card: Card): boolean {
    return false;
  }

  public give(): [Card, SpotInHand] {
    const { card } = this;
    if (card === null) {
      throw new Error("Cannot call give on empty SpotInHand");
    }
    return [card, new SpotInHand(this.label, null)];
  }

  public receive(card: Card): never {
    throw new Error("should not be called");
  }

  public toString(): string {
    const { card } = this;
    if (card === null) {
      return "";
    }
    return card.toString();
  }
}
