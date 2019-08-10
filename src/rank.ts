import { Seq } from "immutable";

const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;

export type Rank = typeof ranks[number];

export const Rank = {
  all,
  show,
};

function all(): Seq.Indexed<Rank> {
  return Seq<Rank>(ranks);
}

function show(rank: Rank): string {
  switch (rank) {
  case 1: return "A";
  case 11: return "J";
  case 12: return "Q";
  case 13: return "K";
  default: return rank.toString();
  }
}
