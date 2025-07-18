import RotationalCipher from './rotational-cipher';

describe('RotationalCipher', function () {
  var rotationalCipher = new RotationalCipher();

  it('rotate a by 0, same output as input', function () {
    var expected = 'a';
    expect(rotationalCipher.rotate('a', 0)).toEqual(expected);
  });

  it('rotate a by 1', function () {
    var expected = 'b';
    expect(rotationalCipher.rotate('a', 1)).toEqual(expected);
  });

  it('rotate a by 26, same output as input', function () {
    var expected = 'a';
    expect(rotationalCipher.rotate('a', 26)).toEqual(expected);
  });

  it('rotate m by 13', function () {
    var expected = 'z';
    expect(rotationalCipher.rotate('m', 13)).toEqual(expected);
  });

  it('rotate n by 13 with wrap around alphabet', function () {
    var expected = 'a';
    expect(rotationalCipher.rotate('n', 13)).toEqual(expected);
  });

  it('rotate capital letters', function () {
    var expected = 'TRL';
    expect(rotationalCipher.rotate('OMG', 5)).toEqual(expected);
  });

  it('rotate spaces', function () {
    var expected = 'T R L';
    expect(rotationalCipher.rotate('O M G', 5)).toEqual(expected);
  });

  it('rotate numbers', function () {
    var expected = 'Xiwxmrk 1 2 3 xiwxmrk';
    expect(rotationalCipher.rotate('Testing 1 2 3 testing', 4)).toEqual(expected);
  });

  it('rotate punctuation', function () {
    var expected = 'Gzo\'n zvo, Bmviyhv!';
    expect(rotationalCipher.rotate('Let\'s eat, Grandma!', 21)).toEqual(expected);
  });

  it('rotate all letters', function () {
    var expected = 'Gur dhvpx oebja sbk whzcf bire gur ynml qbt.';
    expect(rotationalCipher.rotate('The quick brown fox jumps over the lazy dog.', 13)).toEqual(expected);
  });
});
