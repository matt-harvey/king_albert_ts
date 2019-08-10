import { List } from "immutable";

import { Color } from "./color";

const suits = ["spades", "hearts", "diamonds", "clubs"] as const;

export type Suit = typeof suits[number];

export const Suit = {
  all,
  color,
  show,
};

function all(): List<Suit> {
  return List(suits);
}

function color(suit: Suit): Color {
  switch (suit) {
  case "spades": case "clubs": return "black";
  case "hearts": case "diamonds": return "red";
  }
}

function show(suit: Suit): string {
  switch (suit) {
  case "spades": return "\u{2660}";
  case "hearts": return "\u{2661}";
  case "diamonds": return "\u{2662}";
  case "clubs": return "\u{2663}";
  }
}
