import { Card } from "./card";

describe("Card.from", () => {
  it("returns a new card with the passed rank and suit", () => {
    const card = Card.from(3, "clubs");
    expect(card.suit).toEqual("clubs");
    expect(card.rank).toEqual(3);
  });
});

describe("Card#color", () => {
  it("returns the color of the card's suit", () => {
    expect(Card.from(3, "spades").color()).toEqual("black");
    expect(Card.from(12, "spades").color()).toEqual("black");
    expect(Card.from(11, "clubs").color()).toEqual("black");
    expect(Card.from(12, "diamonds").color()).toEqual("red");
    expect(Card.from(3, "hearts").color()).toEqual("red");
    expect(Card.from(1, "hearts").color()).toEqual("red");
  });
});

describe("Card#toString", () => {
  it("returns a brief human-friendly representation of the card", () => {
    expect(Card.from(3, "spades").toString()).toEqual("3♠");
    expect(Card.from(12, "spades").toString()).toEqual("Q♠");
    expect(Card.from(1, "spades").toString()).toEqual("A♠");
    expect(Card.from(10, "spades").toString()).toEqual("10♠");
    expect(Card.from(10, "diamonds").toString()).toEqual("10♢");
    expect(Card.from(9, "clubs").toString()).toEqual("9♣");
    expect(Card.from(11, "hearts").toString()).toEqual("J♡");
  });
  it("is called when the card is interpolated into a template string", () => {
    expect(`This card is the ${Card.from(3, "hearts")}`).toEqual("This card is the 3♡");
  });
});
