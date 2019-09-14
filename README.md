# king\_albert\_ts

## Overview

`king_albert_ts` is a command line implementation of the single-player card game King Albert.

Its main purpose has been as a vehicle for me to play with "mutation free TypeScript". It is written in
a somewhat functional style, in that while state mutation is avoided as far as possible, classes are
still used to facilitate code reuse, data hiding and method chaining. The code makes heavy use of
[ImmutableJS](https://immutable-js.github.io/immutable-js/) for internal data structures. Input and
output operations are confined to `index.ts`, with the rest of the codebase kept side-effect free.

## Installation

Clone the repo, and run `npm run install:dev` from within the project root.

## How to play

Enter `king_albert_ts` at the command line to start. You will be presented with a random starting tableau
and a command prompt. You move by entering two letters, indicating the position you want to a move a
card from, and where you want to move it to. For example, `fc` would move a card from the `f`
position to the `c` position.

The game board consists of four Foundations (labelled `a` to `d`), nine Columns (`e` to `m`), and a
Reserve (`n` to `t`). The aim of the game is to complete the Foundations in ascending order, from
Ace through to King in each suit.

In each Column, only the last card (nearer the bottom of the screen) is available for play. All
cards in the Reserve are also available to play; however cards cannot be moved back into the Reserve
once played.

An empty Foundation can be filled with the Ace of its suit; and thereafter each Foundation must be
built up in ascending sequence from 2 through to King.

Cards can be played onto Columns, but only one at a time (unlike some other forms of solitaire),
and in descending order in alternating colours. For example, if the last card in a Column is a 4 of
hearts, then either the 3 of clubs or the 3 of spades could be played onto that Column.

You have won when the top card of every Foundation is a King.

Note that King Albert is usually not winnable. If the situation seems hopeless, just `quit` and try
again!

## Development

To hack on `king_albert_ts`, you first need NodeJS installed. Clone and `cd` into the repo, and run
`npm i` to install the other dependencies.

Various build commands are available:

* `npm start` runs the application in development mode, directly from the TypeScript sources,
  without compiling it (with startup time being correspondingly slow)
* `npm run build` compiles the application
* `npm run bin:compiled` runs the compiled executable
* `npm run build:watch` starts a file watcher that will recompile the application automatically
  whenever you save changes to a source file
* `npm run install:dev` will build, package and install the application globally on your
  local machine
* `npm test` will run the test suite

Enter `npm run` to see the full list of build commands.
