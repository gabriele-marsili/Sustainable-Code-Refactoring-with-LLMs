import SumOfMultiples from './sum-of-multiples';

describe('SumOfMultiples', function () {
  it('to 1', function () {
    expect(SumOfMultiples().to(1)).toBe(0);
  });

  it('to 3', function () {
    expect(SumOfMultiples().to(4)).toBe(3);
  });

  it('to 10', function () {
    expect(SumOfMultiples().to(10)).toBe(23);
  });

  it('to 100', function () {
    expect(SumOfMultiples().to(100)).toBe(2318);
  });

  it('to 1000', function () {
    expect(SumOfMultiples().to(1000)).toBe(233168);
  });

  it('[7, 13, 17] to 20', function () {
    expect(SumOfMultiples([7, 13, 17]).to(20)).toBe(51);
  });

  it('[4, 6] to 15', function () {
    expect(SumOfMultiples([4, 6]).to(15)).toBe(30);
  });

  it('[5, 6, 8] to 150', function () {
    expect(SumOfMultiples([5, 6, 8]).to(150)).toBe(4419);
  });

  it('[43, 47] to 10000', function () {
    expect(SumOfMultiples([43, 47]).to(10000)).toBe(2203160);
  });
});
