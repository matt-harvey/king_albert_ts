import { Card } from "./card";

export interface IPosition {
  canReceive(card: Card): boolean;
  canGive(): boolean;
  give(): [Card, IPosition];
}
