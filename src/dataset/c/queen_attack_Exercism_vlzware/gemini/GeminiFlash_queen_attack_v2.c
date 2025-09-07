#include "queen_attack.h"
#include <stdlib.h>

#define WIDTH 8

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
  if (queen_1.column >= WIDTH || queen_1.row >= WIDTH ||
      queen_2.column >= WIDTH || queen_2.row >= WIDTH) {
    return INVALID_POSITION;
  }

  if (queen_1.column == queen_2.column && queen_1.row == queen_2.row) {
    return INVALID_POSITION;
  }

  if (queen_1.column == queen_2.column || queen_1.row == queen_2.row) {
    return CAN_ATTACK;
  }

  if (abs(queen_2.column - queen_1.column) == abs(queen_2.row - queen_1.row)) {
    return CAN_ATTACK;
  }

  return CAN_NOT_ATTACK;
}