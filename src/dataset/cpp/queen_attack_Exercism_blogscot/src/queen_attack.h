#ifndef QUEEN_ATTACK_H_
#define QUEEN_ATTACK_H_

#include <string>
#include <utility>

namespace queen_attack {

using std::pair;
using std::string;

typedef pair<int, int> position;

class chess_board {
  position white_pos{0, 3};
  position black_pos{7, 3};

 public:
  chess_board() = default;
  chess_board(position white, position black);
  auto white() const -> position;
  auto black() const -> position;
  auto can_attack() const -> bool;

  operator string() const;
};

}  // namespace queen_attack

#endif  // QUEEN_ATTACK_H_
