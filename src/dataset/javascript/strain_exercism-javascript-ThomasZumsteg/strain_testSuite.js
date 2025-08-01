import strain from './strain';

describe('strain', function() {

  it('keeps on empty array returns empty array', function() {
    expect(strain.keep([], function(e) { return e < 10; })).toEqual([]);
  });

  it('keeps everything ', function() {
    expect(strain.keep([1, 2, 3], function(e) { return e < 10; })).toEqual([1, 2, 3]);
  });

  it('keeps first and last', function() {
    expect(strain.keep([1, 2, 3], function(e) { return (e % 2) === 1; })).toEqual([1, 3]);
  });

  it('keeps neither first nor last', function() {
    expect(strain.keep([1, 2, 3, 4, 5], function(e) { return (e % 2) === 0; })).toEqual([2, 4]);
  });

  it('keeps strings', function() {
    var words = 'apple zebra banana zombies cherimoya zelot'.split(' ');
    var result = strain.keep(words, function(word) { return word.indexOf('z') === 0; });
    expect(result).toEqual('zebra zombies zelot'.split(' '));
  });

  it('keeps arrays', function() {
    var rows = [
      [1, 2, 3],
      [5, 5, 5],
      [5, 1, 2],
      [2, 1, 2],
      [1, 5, 2],
      [2, 2, 1],
      [1, 2, 5]
    ];
    var result = strain.keep(rows, function(row) { return row.indexOf(5) > -1; });
    expect(result).toEqual([[5, 5, 5], [5, 1, 2], [1, 5, 2], [1, 2, 5]]);
  });

  it('empty discard', function() {
    expect(strain.discard([], function(e) { return e < 10;})).toEqual([]);
  });

  it('discards nothing', function() {
    expect(strain.discard([1, 2, 3], function(e) { return e > 10; })).toEqual([1, 2, 3]);
  });

  it('discards first and last', function() {
    expect(strain.discard([1, 2, 3], function(e) { return e % 2 === 1; })).toEqual([2]);
  });

  it('discards neither first nor last', function() {
    var result = strain.discard([1, 2, 3, 4, 5], function(e) { return e % 2 === 0; });
    expect(result).toEqual([1, 3, 5]);
  });

  it('discards strings', function() {
    var words = 'apple zebra banana zombies cherimoya zelot'.split(' ');
    var result = strain.discard(words, function(word) { return word.indexOf('z') === 0; });
    expect(result).toEqual('apple banana cherimoya'.split(' '));
  });

  it('discards arrays', function() {
    var rows = [
      [1, 2, 3],
      [5, 5, 5],
      [5, 1, 2],
      [2, 1, 2],
      [1, 5, 2],
      [2, 2, 1],
      [1, 2, 5]
    ];
    var result = strain.discard(rows, function(row) { return row.indexOf(5) > -1; });
    expect(result).toEqual([[1, 2, 3], [2, 1, 2], [2, 2, 1]]);
  });

});

