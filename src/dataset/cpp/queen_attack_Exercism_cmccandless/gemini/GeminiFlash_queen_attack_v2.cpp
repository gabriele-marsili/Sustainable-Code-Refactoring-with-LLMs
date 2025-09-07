#include "queen_attack.h"
#include <sstream>
#include <cmath>

using namespace std;

namespace queen_attack {

chess_board::chess_board() : _white({0, 3}), _black({7, 3}) {}

chess_board::chess_board(pair<int, int> w, pair<int, int> b) : _white(w), _black(b) {
  if (_white == _black) {
    throw domain_error("Positions cannot be the same.");
  }
}

pair<int, int> chess_board::white() const { return _white; }

pair<int, int> chess_board::black() const { return _black; }

chess_board::operator string() const {
  stringstream ss;
  for (int i = 0; i < 8; ++i) {
    for (int j = 0; j < 8; ++j) {
      if (_white.first == i && _white.second == j) {
        ss << 'W';
      } else if (_black.first == i && _black.second == j) {
        ss << 'B';
      } else {
        ss << '_';
      }
      if (j < 7) {
        ss << ' ';
      }
    }
    ss << endl;
  }
  return ss.str();
}

bool chess_board::can_attack() const {
  int row_diff = _white.first - _black.first;
  int col_diff = _white.second - _black.second;
  return row_diff == 0 || col_diff == 0 || abs(row_diff) == abs(col_diff);
}

}  // namespace queen_attack