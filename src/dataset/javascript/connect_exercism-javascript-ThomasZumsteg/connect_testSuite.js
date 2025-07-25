import Board from './connect';

describe('Judging a game of connect', function () {
  it('an empty board has no winner', function () {
    var board = [
      '. . . . .',
      ' . . . . .',
      '  . . . . .',
      '   . . . . .',
      '    . . . . .'
    ];
    expect(new Board(board).winner()).toEqual('');
  });

  it('X can win on a 1x1 board', function () {
    var board = [
      'X'
    ];
    expect(new Board(board).winner()).toEqual('X');
  });

  it('O can win on a 1x1 board', function () {
    var board = [
      'O'
    ];
    expect(new Board(board).winner()).toEqual('O');
  });

  it('only edges does not make a winner', function () {
    var board = [
      'O O O X',
      ' X . . X',
      '  X . . X',
      '   X O O O'
    ];
    expect(new Board(board).winner()).toEqual('');
  });

  it('illegal diagonal does not make a winner', function () {
    var board = [
      'X O . .',
      ' O X X X',
      '  O X O .',
      '   . O X .',
      '    X X O O'
    ];
    expect(new Board(board).winner()).toEqual('');
  });

  it('nobody wins crossing adjacent angles', function () {
    var board = [
      'X . . .',
      ' . X O .',
      '  O . X O',
      '   . O . X',
      '    . . O .'
    ];
    expect(new Board(board).winner()).toEqual('');
  });

  it('X wins crossing from left to right', function () {
    var board = [
      '. O . .',
      ' O X X X',
      '  O X O .',
      '   X X O X',
      '    . O X .'
    ];
    expect(new Board(board).winner()).toEqual('X');
  });

  it('O wins crossing from top to bottom', function () {
    var board = [
      '. O . .',
      ' O X X X',
      '  O O O .',
      '   X X O X',
      '    . O X .'
    ];
    expect(new Board(board).winner()).toEqual('O');
  });

  it('X wins using a convoluted path', function () {
    var board = [
      '. X X . .',
      ' X . X . X',
      '  . X . X .',
      '   . X X . .',
      '    O O O O O'
    ];
    expect(new Board(board).winner()).toEqual('X');
  });

  it('X wins using a spiral path', function () {
    var board = [
      'O X X X X X X X X',
      ' O X O O O O O O O',
      '  O X O X X X X X O',
      '   O X O X O O O X O',
      '    O X O X X X O X O',
      '     O X O O O X O X O',
      '      O X X X X X O X O',
      '       O O O O O O O X O',
      '        X X X X X X X X O'
    ];
    expect(new Board(board).winner()).toEqual('X');
  });
});
