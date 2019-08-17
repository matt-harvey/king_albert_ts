import { Card } from "./card";
import { Label } from "./label";

export abstract class Position {
  public constructor(
    public readonly label: Label,
  ) {
  }

  public abstract canReceive(card: Card): boolean;
  public abstract canGive(): boolean;
  public abstract give(): [Card, Position];
  public abstract receive(card: Card): Position;
}
