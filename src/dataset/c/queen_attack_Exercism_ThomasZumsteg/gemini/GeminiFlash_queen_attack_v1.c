#include "queen_attack.h"
#include <stdlib.h>
#include <stdbool.h>

static inline bool is_valid(position_t queen) {
    return (queen.row >= 0 && queen.row < 8 && queen.column >= 0 && queen.column < 8);
}

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
    if (!is_valid(queen_1) || !is_valid(queen_2) || (queen_1.row == queen_2.row && queen_1.column == queen_2.column)) {
        return INVALID_POSITION;
    }

    int row_diff = queen_1.row - queen_2.row;
    int column_diff = queen_1.column - queen_2.column;

    if (row_diff == 0 || column_diff == 0 || abs(row_diff) == abs(column_diff)) {
        return CAN_ATTACK;
    } else {
        return CAN_NOT_ATTACK;
    }
}