#include "queen_attack.h"

#include <stdlib.h>

attack_status_t can_attack(position_t black, position_t white) {
  if (black.column > 7 || black.row > 7 || white.column > 7 || white.row > 7 || (black.column == white.column && black.row == white.row)) {
    return INVALID_POSITION;
  }

  if (black.column == white.column || black.row == white.row) {
    return CAN_ATTACK;
  }

  int row_diff = black.row - white.row;
  int col_diff = black.column - white.column;

  if (row_diff < 0) row_diff = -row_diff;
  if (col_diff < 0) col_diff = -col_diff;

  if (row_diff == col_diff) {
    return CAN_ATTACK;
  }

  return CAN_NOT_ATTACK;
}