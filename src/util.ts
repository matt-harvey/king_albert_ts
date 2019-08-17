import { List, Range } from "immutable";

export interface ISized {
  size: number;
}

export interface IStringable {
  toString(): string;
}

export function stringify(s: IStringable) {
  return s.toString();
}

export function transposeAndFill<T>(columns: List<List<T>>, filler: T): List<List<T>> {
  const fillTo = columns.reduce((size, column) => Math.max(size, column.size), 0);
  const nthRow = (n: number) => columns.map(column => column.get(n, filler));
  const pushNthRow = (rows: List<List<T>>, n: number) => rows.push(nthRow(n));
  return Range(0, fillTo).reduce(pushNthRow, List<List<T>>());
}
