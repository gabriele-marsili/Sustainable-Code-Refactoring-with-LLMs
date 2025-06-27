#include "queen_attack.h"

#include <stdlib.h>

attack_status_t can_attack(position_t black, position_t white)
{
  if ((black.column == white.column && black.row == white.row) || black.column > 7 || black.row > 7 || white.column > 7 || white.row > 7)
  {
    return INVALID_POSITION;
  }

  if (black.column == white.column || black.row == white.row || abs(black.row - white.row) == abs(black.column - white.column))
  {
    return CAN_ATTACK;
  }

  return CAN_NOT_ATTACK;
}
