#include "queen_attack.h"

attack_status_t can_attack(position_t black, position_t white)
{
  // Check for invalid positions first (most likely to fail fast)
  if (black.column > 7 || black.row > 7 || white.column > 7 || white.row > 7)
  {
    return INVALID_POSITION;
  }
  
  // Check if positions are identical
  if (black.column == white.column && black.row == white.row)
  {
    return INVALID_POSITION;
  }

  // Check for attack conditions
  if (black.column == white.column || black.row == white.row)
  {
    return CAN_ATTACK;
  }
  
  // Check diagonal attack using bit operations to avoid abs() function call
  int row_diff = black.row - white.row;
  int col_diff = black.column - white.column;
  if ((row_diff ^ (row_diff >> 31)) - (row_diff >> 31) == (col_diff ^ (col_diff >> 31)) - (col_diff >> 31))
  {
    return CAN_ATTACK;
  }

  return CAN_NOT_ATTACK;
}