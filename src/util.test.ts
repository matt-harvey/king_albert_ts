import { stringify } from "./util";

describe("stringify", () => {
  it("returns the string representation of the passed object", () => {
    expect(stringify(50)).toEqual("50");
    expect(stringify("7")).toEqual("7");
    expect(stringify("hello")).toEqual("hello");
    expect(stringify(["cool", 3])).toEqual("cool,3");
  });
});
