#include "queen_attack.h"

attack_status_t can_attack(position_t black, position_t white)
{
  if (black.column > 7 || black.row > 7 || white.column > 7 || white.row > 7)
  {
    return INVALID_POSITION;
  }

  if (black.column == white.column && black.row == white.row)
  {
    return INVALID_POSITION;
  }

  int col_diff = black.column - white.column;
  int row_diff = black.row - white.row;

  if (col_diff == 0 || row_diff == 0 || col_diff == row_diff || col_diff == -row_diff)
  {
    return CAN_ATTACK;
  }

  return CAN_NOT_ATTACK;
}