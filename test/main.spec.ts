console.log(`test`);

import { expect } from "chai";
import { limitedEvaluate } from "../src/math.js";
import * as QuickMafs from "../src/index.js";

const { Game, allUnique } = QuickMafs;

describe(`unit`, function () {
  it(`allUnique`, function () {
    expect(allUnique([1, 2, 3, 4, 5])).to.be.true;
    expect(allUnique([1, 2, 3, 4, 5, 1])).to.be.false;
  });
  it(`math`, function () {
    expect(limitedEvaluate(`1 + 2`)).to.equal(3);
    expect(() => {
      limitedEvaluate(`1 + 2 + 300----324/a3/5/23/4////adsf/x/x/a`);
    }).to.throw();

    const prohibitedFunctions = [
      `import`,
      `createUnit`,
      `evaluate`,
      `parse`,
      `simplify`,
      `derivative`,
    ];
    for (const func of prohibitedFunctions) {
      expect(() => {
        limitedEvaluate(`${func}()`);
      }).to.throw();
    }
  });

  describe(`internal functions`, function () {
    it(`randInt`, function () {
      expect(() => {
        QuickMafs.randInt(0, 0);
      }).to.throw();
      expect(() => {
        QuickMafs.randInt(0, -1);
      }).to.throw();
      expect(QuickMafs.randInt(0, 1)).to.be.within(0, 1);
      expect(QuickMafs.randInt(0, 10)).to.be.within(0, 10);
      expect(QuickMafs.randInt(0, 100)).to.be.within(0, 100);
      expect(QuickMafs.randInt(0, 1000)).to.be.within(0, 1000);
      expect(QuickMafs.randInt(0, 10000)).to.be.within(0, 10000);
    });
    it(`isSuperset`, function () {
      expect(QuickMafs.isSuperset([1, 2, 3], [1, 2, 3])).to.be.true;
      expect(QuickMafs.isSuperset([1, 2, 3], [1, 2])).to.be.true;
      expect(QuickMafs.isSuperset([1, 2, 3], [1, 2, 3, 4])).to.be.false;
    });
    it(`select`, function () {
      expect(() => {
        QuickMafs.select(0, 0, -1);
      }).to.throw();
      expect(() => {
        QuickMafs.select(0, 1, 0);
      }).to.throw();
      expect(() => {
        QuickMafs.select(0, 1, -1);
      }).to.throw();
      expect(() => {
        QuickMafs.select(10, -1, 2);
      }).to.throw();
      expect(QuickMafs.select(1, 0, 1)).to.have.lengthOf(1);
      expect(QuickMafs.select(2, 0, 2)).to.have.lengthOf(2);
      expect(QuickMafs.select(3, 0, 3)).to.have.lengthOf(3);
      expect(QuickMafs.select(4, 0, 4)).to.have.lengthOf(4);
    });
  });
});

describe(`main`, function () {
  it(`Should not error on many types of construction examples`, function () {
    expect(() => {
      new Game();
      new Game(2);
      new Game(2, false);
      const g = new Game(2, true);
      g.init([]);
    }).to.not.throw();
  });

  it(`Should not allow initializing twice`, function () {
    expect(() => {
      const g = new Game();
      g.init();
    }).to.throw();
  });

  it(`Just do the game idk`, function () {
    const game = new Game(2, true);
    game.init([1, 2, 3, 4]);

    const throws = [`1 + 1`, `3 + 10`, `1290u41jklccadofj`, `a`, ``, `1 + 2`];

    for (const t of throws) {
      expect(() => {
        game.validate(t);
      }, `Arguments: ${t}`).to.throw();
    }

    expect(() => game.validate(`4-2`)).to.not.throw();
  });
});

// so, I was wondering
// why is it "nopeless" and not "nopemore"?
// because i am hopeless
// )-:
// not tru
// hopeless? more like faultless
