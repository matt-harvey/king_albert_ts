import { List, Range } from "immutable";

import { stringify, transposeAndFill } from "./util";

describe("stringify", () => {
  it("returns the string representation of the passed object", () => {
    expect(stringify(50)).toEqual("50");
    expect(stringify("7")).toEqual("7");
    expect(stringify("hello")).toEqual("hello");
    expect(stringify(["cool", 3])).toEqual("cool,3");
  });
});

describe("transposeAndFill", () => {
  it("transposes the list of lists, filling lists with the filler value as required to equalize list lengths", () => {
    const list = List([
      List([1, 2]),
      List([70, 3, 6, 9]),
      List([2]),
      List<number>(),
    ]);
    expect(transposeAndFill(list, 7)).toEqual(List([
      List([1, 70, 2, 7]),
      List([2, 3, 7, 7]),
      List([7, 6, 7, 7]),
      List([7, 9, 7, 7]),
    ]));
  });
});
