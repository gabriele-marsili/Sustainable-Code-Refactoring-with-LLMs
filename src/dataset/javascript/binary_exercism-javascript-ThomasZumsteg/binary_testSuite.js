import Binary from './binary';

describe('binary', function() {
  it('0 is decimal 0', function() {
    expect(new Binary('0').toDecimal()).toEqual(0);
  });

  it('1 is decimal 1', function() {
    expect(new Binary('1').toDecimal()).toEqual(1);
  });

  it('10 is decimal 2', function() {
    expect(new Binary('10').toDecimal()).toEqual(2);
  });

  it('11 is decimal 3', function() {
    expect(new Binary('11').toDecimal()).toEqual(3);
  });

  it('100 is decimal 4', function() {
    expect(new Binary('100').toDecimal()).toEqual(4);
  });

  it('1001 is decimal 9', function() {
    expect(new Binary('1001').toDecimal()).toEqual(9);
  });

  it('11010 is decimal 26', function() {
    expect(new Binary('11010').toDecimal()).toEqual(26);
  });

  it('10001101000 is decimal 1128', function() {
    expect(new Binary('10001101000').toDecimal()).toEqual(1128);
  });

  it('00011111 is decimal 31', function() {
    expect(new Binary('00011111').toDecimal()).toEqual(31);
  });

  it('invalid inputs are decimal 0', function() {
    expect(new Binary('carrot').toDecimal()).toEqual(0);
    expect(new Binary('012').toDecimal()).toEqual(0);
    expect(new Binary('10nope').toDecimal()).toEqual(0);
    expect(new Binary('nope10').toDecimal()).toEqual(0);
  });

});
