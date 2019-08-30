import { Label } from "./label";

export const Move = {
  from,
};

// Represents a move of one card from one board position to another.
export type Move = {
  readonly source: Label,
  readonly destination: Label,
};

// If passed a 2-character string, returns a Move where the source is based on the first character
// and the destation on the second character, such that 'a' is the Label 0, 'b' is 1, etc..
// If passed a string that is not exactly 2 characters long, returns null.
function from(s: string): Move | null {
  if (s.length !== 2) {
    return null;
  }
  const letters = s.split("");
  const [source, destination] = letters.map(Label.from);
  return { source, destination };
}
