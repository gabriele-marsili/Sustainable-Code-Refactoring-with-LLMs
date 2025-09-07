#include "queen_attack.h"

#include <stdbool.h>

static inline bool is_invalid_position(position_t pos) {
    return pos.column > 7 || pos.row > 7;
}

attack_status_t can_attack(position_t black, position_t white) {
    if (is_invalid_position(black) || is_invalid_position(white) || 
        (black.column == white.column && black.row == white.row)) {
        return INVALID_POSITION;
    }

    return (black.column == white.column || black.row == white.row || 
            abs(black.row - white.row) == abs(black.column - white.column)) 
            ? CAN_ATTACK : CAN_NOT_ATTACK;
}