#include "./queen_attack.h"
#include <sstream>
#include <stdexcept>

namespace queen_attack {

chess_board::chess_board(position white, position black)
    : white_pos(white), black_pos(black) {
  if (white_pos == black_pos) {
    throw std::domain_error("Invalid queen positions!");
  }
}

auto chess_board::white() const -> position { return white_pos; }
auto chess_board::black() const -> position { return black_pos; }

auto chess_board::can_attack() const -> bool {
  int row_diff = white_pos.first - black_pos.first;
  int col_diff = white_pos.second - black_pos.second;
  return (row_diff == 0 || col_diff == 0 || std::abs(row_diff) == std::abs(col_diff));
}

chess_board::operator std::string() const {
  constexpr int board_size = 8;
  std::string board;
  board.reserve((board_size * (board_size * 2 - 1)) + board_size); // Preallocate memory

  for (int row = 0; row < board_size; ++row) {
    for (int column = 0; column < board_size; ++column) {
      if (row == white_pos.first && column == white_pos.second) {
        board += 'W';
      } else if (row == black_pos.first && column == black_pos.second) {
        board += 'B';
      } else {
        board += '_';
      }
      if (column != board_size - 1) board += ' ';
    }
    board += '\n';
  }
  return board;
}

}  // namespace queen_attack