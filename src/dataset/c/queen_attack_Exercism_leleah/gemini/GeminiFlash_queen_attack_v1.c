#include "queen_attack.h"
#include "stdlib.h"

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
  if ((queen_1.row > 7 || queen_1.column > 7) ||
      (queen_2.row > 7 || queen_2.column > 7)) {
    return INVALID_POSITION;
  }

  if (queen_1.row == queen_2.row && queen_1.column == queen_2.column) {
    return INVALID_POSITION;
  }

  if (queen_1.row == queen_2.row || queen_1.column == queen_2.column) {
    return CAN_ATTACK;
  }

  int row_diff = queen_1.row - queen_2.row;
  int col_diff = queen_1.column - queen_2.column;

  if (row_diff < 0) row_diff = -row_diff;
  if (col_diff < 0) col_diff = -col_diff;

  if (row_diff == col_diff) {
    return CAN_ATTACK;
  }

  return CAN_NOT_ATTACK;
}