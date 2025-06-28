
#include "./queen_attack.h"
#include <math.h>
#include <iomanip>
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
  auto on_diagonal = [&]() -> bool {
    auto row_diff = std::abs(white_pos.first - black_pos.first);
    auto col_diff = std::abs(white_pos.second - black_pos.second);
    return row_diff == col_diff;
  };
  return (white_pos.first == black_pos.first ||
          white_pos.second == black_pos.second || on_diagonal());
}

chess_board::operator std::string() const {
  using std::make_pair;
  const auto last_column = 7;
  const auto last_row = 7;
  std::stringstream ss;

  for (int row = 0; row <= last_row; ++row) {
    for (int column = 0; column <= last_column; ++column) {
      if (make_pair(row, column) == white_pos) {
        ss << 'W';
      } else if (make_pair(row, column) == black_pos) {
        ss << 'B';
      } else {
        ss << '_';
      }
      if (column != last_column) ss << ' ';
    }
    ss << '\n';
  }
  return ss.str();
}

}  // namespace queen_attack
