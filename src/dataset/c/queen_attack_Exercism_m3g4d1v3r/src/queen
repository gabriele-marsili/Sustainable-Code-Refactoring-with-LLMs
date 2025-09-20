#include "queen_attack.h"

#include <stdbool.h>
#include <stdlib.h>

static inline bool validate_position(position_t queen) {
    return (queen.row < BOARD_1D && queen.column < BOARD_1D);
}

static inline bool same_row(position_t queen_1, position_t queen_2) {
    return (queen_1.row == queen_2.row);
}

static inline bool same_column(position_t queen_1, position_t queen_2) {
    return (queen_1.column == queen_2.column);
}

static inline bool same_diagonal(position_t queen_1, position_t queen_2) {
    return (abs(queen_1.row - queen_2.row) == abs(queen_1.column - queen_2.column));
}

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
    if (!validate_position(queen_1) || !validate_position(queen_2)) 
        return INVALID_POSITION;
    if (same_row(queen_1, queen_2) && same_column(queen_1, queen_2))
        return INVALID_POSITION;
    if (same_row(queen_1, queen_2) || same_column(queen_1, queen_2) || same_diagonal(queen_1, queen_2))
        return CAN_ATTACK;
    return CAN_NOT_ATTACK;
}