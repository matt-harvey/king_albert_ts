declare module "readline-promise" {
  import * as readline from "readline";

  export class Interface extends readline.Interface {
    public forEach(callback: (line: string, index: number) => void): void;
    public questionAsync(query: string): Promise<string>;

    /* VARIOUS OTHER METHODS TO BE TYPED AS REQUIRED:
     * map...
     * reduce...
     * etc..
     */
  }

  type CompleterResult = [string[], string];
  type Completer = (line: string) => CompleterResult;
  type AsyncCompleter = (line: string, callback: (err: any, result: CompleterResult) => void) => any;

  interface IReadlineOptions {
    input: NodeJS.ReadableStream;
    output?: NodeJS.WritableStream;
    completer?: Completer | AsyncCompleter;
    terminal?: boolean;
    historySize?: number;
    prompt?: string;
    crlfDelay?: number;
    removeHistoryDuplicates?: boolean;
  }

  const readlinePromise: {
    createInterface(options: IReadlineOptions): Interface,

    /* TO TYPE PROPERLY AS REQUIRED:
    clearLine: any;
    clearScreenDown: any;
    cursorTo: any;
    emitKeypressEvents: any;
    moveCursor: any;
    */
  };

  export default readlinePromise;
}
