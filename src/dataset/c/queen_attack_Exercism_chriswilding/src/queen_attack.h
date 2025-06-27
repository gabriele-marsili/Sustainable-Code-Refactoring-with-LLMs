#ifndef QUEEN_ATTACK_H
#define QUEEN_ATTACK_H

#include <stdint.h>

typedef enum {
   CAN_NOT_ATTACK,
   CAN_ATTACK,
   INVALID_POSITION
} attack_status_t;

typedef struct {
   uint8_t row;
   uint8_t column;
} position_t;

attack_status_t can_attack(position_t black, position_t white);

#endif
