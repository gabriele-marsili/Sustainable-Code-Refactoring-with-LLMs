#include "queen_attack.h"

#define WIDTH 8

static inline int abs_diff(int a, int b) {
  int diff = a - b;
  return (diff < 0) ? -diff : diff;
}

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
  if (queen_1.column >= WIDTH || queen_1.row >= WIDTH ||
      queen_2.column >= WIDTH || queen_2.row >= WIDTH ||
      (queen_1.column == queen_2.column && queen_1.row == queen_2.row)) {
    return INVALID_POSITION;
  }

  if (queen_1.column == queen_2.column || queen_1.row == queen_2.row) {
    return CAN_ATTACK;
  }

  return (abs_diff(queen_1.column, queen_2.column) == abs_diff(queen_1.row, queen_2.row))
         ? CAN_ATTACK
         : CAN_NOT_ATTACK;
}