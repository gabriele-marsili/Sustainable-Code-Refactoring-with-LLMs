import Triangle from './pascals-triangle';

describe('Triangle', function () {

  it('with one row', function () {
    expect(new Triangle(1).rows).toEqual([[1]]);
  });

  it('with two rows', function () {
    expect(new Triangle(2).rows).toEqual([[1], [1, 1]]);
  });

  it('with three rows', function () {
    expect(new Triangle(3).rows).toEqual([[1], [1, 1], [1, 2, 1]]);
  });

  it('last row', function () {
    expect(new Triangle(4).lastRow).toEqual([1, 3, 3, 1]);
  });

  it('fifth row', function () {
    expect(new Triangle(5).lastRow).toEqual([1, 4, 6, 4 ,1]);
  });

  it('twentieth row', function () {
    var twentieth = [1, 19, 171, 969, 3876, 11628, 27132, 50388, 75582, 92378, 92378, 75582, 50388, 27132, 11628, 3876, 969, 171, 19, 1];
    expect(new Triangle(20).lastRow)
      .toEqual(twentieth);
  });

});
