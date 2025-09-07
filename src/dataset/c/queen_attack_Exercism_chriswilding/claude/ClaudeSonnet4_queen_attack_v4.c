#include "queen_attack.h"

attack_status_t can_attack(position_t black, position_t white)
{
  if ((black.column | black.row | white.column | white.row) > 7 || 
      (black.column == white.column && black.row == white.row))
  {
    return INVALID_POSITION;
  }

  int col_diff = black.column - white.column;
  int row_diff = black.row - white.row;
  
  if (col_diff == 0 || row_diff == 0 || 
      ((col_diff ^ row_diff) == 0) || ((col_diff ^ -row_diff) == 0))
  {
    return CAN_ATTACK;
  }

  return CAN_NOT_ATTACK;
}