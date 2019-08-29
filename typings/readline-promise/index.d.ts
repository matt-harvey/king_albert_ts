declare module "readline-promise" {
  import * as readline from "readline";

  class Interface extends readline.Interface {
    public forEach(callback: (line: string, index: number) => void): void;
    public questionAsync(query: string): Promise<string>;
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

  type ReadlinePromise = {
    createInterface(options: IReadlineOptions): Interface,
  };

  const readlinePromise: ReadlinePromise;
  export default readlinePromise;
}
