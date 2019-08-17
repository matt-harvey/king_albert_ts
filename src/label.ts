export type Label = number;

const min = 0;

const offset = "a".charCodeAt(0);

function from(c: string): Label {
  if (c.length !== 1) {
    throw new Error(`Invalid label: ${c}`);
  }
  return c.charCodeAt(0) - offset;
}

function show(label: Label): string {
  return String.fromCharCode(offset + label);
}

export const Label = {
  from,
  min,
  show,
};
