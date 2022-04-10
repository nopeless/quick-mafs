import { limitedEvaluate } from "./math.js";

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isSuperset(arr1: Iterable<unknown>, arr2: Iterable<unknown>) {
  const superArr = [...arr1];
  for (const item of arr2) {
    if (!superArr.includes(item)) return false;
  }
  return true;
}

const pick = function (n: number) {
  if (!n || !this.length) return [];
  const i = Math.floor(this.length * Math.random());
  return this.splice(i, 1).concat(pick.bind(this)(n - 1));
};

/**
 * `[start, end]` inclusive, sample `n` numbers
 */
function select(n: number, start: number, end: number): number[] {
  if (start > end) return [];
  if (n > end - start + 1) throw new Error(`n is bigger than range`);

  const numberRange = Array.from(Array(end - start + 1).keys()).map(
    (x) => x + start
  );
  return pick.bind(numberRange)(n);
}

class GameMessage extends Error {
  constructor(public message: string) {
    super(message);
  }
}

class Game {
  public target: number;
  public numberPool: number[];
  constructor(target?: number, skipInit = false) {
    this.target = target ?? randInt(15, 35);

    if (skipInit) return;
  }

  public init(numberPool?: number[]) {
    if (numberPool) {
      this.numberPool = numberPool;
      return;
    }
    const numberOfSingleDigits = randInt(2, 5);
    this.numberPool = [
      // single digits and double, triple digits
      ...select(numberOfSingleDigits, 1, 9),
      ...select(10 - numberOfSingleDigits, 10, 99),
    ];
  }

  public validate(string: string) {
    string = string.replace(/\*\*/g, `^`);
    let res: number;
    try {
      res = limitedEvaluate(string);
    } catch (e) {
      e.message = `Cannot validate because of invalid input math equation. Original error: ${e.message}`;
      throw e;
    }

    if (res !== this.target) {
      throw new GameMessage(`${res} is not the target value ${this.target}`);
    }

    const nums = (string.match(/\d+/g) || []).map((v) => Number(v));
    if (nums.length === 0) {
      throw new GameMessage(`You should use at least 1 number`);
    }

    if (!isSuperset(this.numberPool, nums)) {
      throw new GameMessage(`You should use numbers from ${this.numberPool}`);
    }

    return true;
  }
}

export { Game, GameMessage };
