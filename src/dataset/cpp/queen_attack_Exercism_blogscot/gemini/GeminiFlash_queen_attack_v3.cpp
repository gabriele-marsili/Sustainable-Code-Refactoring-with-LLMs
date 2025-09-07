#include "./queen_attack.h"
#include <cmath>
#include <stdexcept>
#include <string>
#include <vector>

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
  if (white_pos.first == black_pos.first ||
      white_pos.second == black_pos.second) {
    return true;
  }

  auto row_diff = std::abs(white_pos.first - black_pos.first);
  auto col_diff = std::abs(white_pos.second - black_pos.second);
  return row_diff == col_diff;
}

chess_board::operator std::string() const {
  static constexpr int board_size = 8;
  std::string board_str;
  board_str.reserve(board_size * (board_size * 2) );

  for (int row = 0; row < board_size; ++row) {
    for (int column = 0; column < board_size; ++column) {
      if (white_pos.first == row && white_pos.second == column) {
        board_str += 'W';
      } else if (black_pos.first == row && black_pos.second == column) {
        board_str += 'B';
      } else {
        board_str += '_';
      }
      if (column != board_size - 1) {
        board_str += ' ';
      }
    }
    board_str += '\n';
  }
  return board_str;
}

}  // namespace queen_attack