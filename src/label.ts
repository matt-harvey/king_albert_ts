// A type suitable for labelling game items for eventual presentation to the user.
// It is intended to be used as an index into collections of game items.
export type Label = number;

// The smallest Label envisaged for use in play.
const min = 0;

const offset = "a".charCodeAt(0);

// Converts a single-character string to a label or, if the string does not have a single character,
// throws an exception.
function from(c: string): Label {
  if (c.length === 0) {
    throw new Error("Empty string cannot be converted to Label");
  }
  if (c.length !== 1) {
    throw new Error(`String too long to be converted to Label: ${c}`);
  }
  return c.charCodeAt(0) - offset;
}

// Converts a Label to a string suitable for display to the user.
function show(label: Label): string {
  return String.fromCharCode(offset + label);
}

export const Label = {
  from,
  min,
  show,
};
