import { Card } from "./card";
import { Label } from "./label";

// Represents a position occupyable by a card in the playing area.
export abstract class Position {
  public constructor(
    public readonly label: Label,
  ) {
  }

  // Returns true if and only if the position can have the passed card played to it.
  public abstract canReceive(card: Card): boolean;

  // Returns true if and only if the position can have a card taken from it.
  public abstract canGive(): boolean;

  // Returns the next card from the position, together with a new position that does not contain the card.
  public abstract give(): [Card, Position];

  // Adds the given card to the position, returning a new position that contains the card.
  public abstract receive(card: Card): Position;
}
