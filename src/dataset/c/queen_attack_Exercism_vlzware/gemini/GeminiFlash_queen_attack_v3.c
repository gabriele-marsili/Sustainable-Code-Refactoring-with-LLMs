#include "queen_attack.h"

#define WIDTH 8

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
  if (queen_1.column >= WIDTH || queen_1.row >= WIDTH ||
      queen_2.column >= WIDTH || queen_2.row >= WIDTH ||
      (queen_1.column == queen_2.column && queen_1.row == queen_2.row)) {
    return INVALID_POSITION;
  }

  int col_diff = queen_2.column - queen_1.column;
  int row_diff = queen_2.row - queen_1.row;

  if (col_diff == 0 || row_diff == 0) {
    return CAN_ATTACK;
  }

  if (col_diff < 0) col_diff = -col_diff;
  if (row_diff < 0) row_diff = -row_diff;

  return (col_diff == row_diff) ? CAN_ATTACK : CAN_NOT_ATTACK;
}