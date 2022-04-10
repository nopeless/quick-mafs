import { expect } from "chai";

function allUnique(values: unknown[]) {
  const set = new Set(values);
  return set.size === values.length;
}

describe(`main`, function () {
  it(`should be true`, function () {
    expect(true).to.be.true;
  });
});
