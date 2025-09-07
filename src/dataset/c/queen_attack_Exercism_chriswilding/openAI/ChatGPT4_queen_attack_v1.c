#include "queen_attack.h"

attack_status_t can_attack(position_t black, position_t white)
{
  if (black.column > 7 || black.row > 7 || white.column > 7 || white.row > 7 || 
      (black.column == white.column && black.row == white.row))
  {
    return INVALID_POSITION;
  }

  return (black.column == white.column || black.row == white.row || 
          abs(black.row - white.row) == abs(black.column - white.column)) 
         ? CAN_ATTACK 
         : CAN_NOT_ATTACK;
}