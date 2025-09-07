#include "./queen_attack.h"
#include <cmath>
#include <iomanip>
#include <sstream>
#include <stdexcept>
#include <utility>

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
  std::string board_str;
  board_str.reserve(8 * 16 + 8); 

  for (int row = 0; row < 8; ++row) {
    for (int column = 0; column < 8; ++column) {
      if (std::make_pair(row, column) == white_pos) {
        board_str += 'W';
      } else if (std::make_pair(row, column) == black_pos) {
        board_str += 'B';
      } else {
        board_str += '_';
      }
      if (column != 7) board_str += ' ';
    }
    board_str += '\n';
  }
  return board_str;
}

}  // namespace queen_attack