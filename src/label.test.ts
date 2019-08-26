import { Label } from "./label";

describe("Label.from", () => {
  describe("when passed a single character string", () => {
    it("converts the string to a Label, being an alphabetic index such that 'a' is the 0 value", () => {
      expect(Label.from("a")).toEqual(0);
      expect(Label.from("c")).toEqual(2);
      expect(Label.from("z")).toEqual(25);
    });
  });
  describe("when passed a string that does not have exactly one character", () => {
    it("throws an error", () => {
      expect(() => Label.from("")).toThrow("Empty string cannot be converted to Label");
      expect(() => Label.from("xy")).toThrow("String too long to be converted to Label: xy");
    });
  });
});

describe("Label.show", () => {
  it("converts Label to a user-friendly single-character representation", () => {
    expect(Label.show(0)).toEqual("a");
    expect(Label.show(14)).toEqual("o");
    expect(Label.show(25)).toEqual("z");
  });
});
