#include "./queen_attack.h"
#include <cstdlib>
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
  if (white_pos.first == black_pos.first || white_pos.second == black_pos.second) {
    return true;
  }
  
  const int row_diff = std::abs(white_pos.first - black_pos.first);
  const int col_diff = std::abs(white_pos.second - black_pos.second);
  return row_diff == col_diff;
}

chess_board::operator std::string() const {
  std::string result;
  result.reserve(128);
  
  for (int row = 0; row <= 7; ++row) {
    for (int column = 0; column <= 7; ++column) {
      if (row == white_pos.first && column == white_pos.second) {
        result += 'W';
      } else if (row == black_pos.first && column == black_pos.second) {
        result += 'B';
      } else {
        result += '_';
      }
      if (column != 7) result += ' ';
    }
    result += '\n';
  }
  return result;
}

}  // namespace queen_attack