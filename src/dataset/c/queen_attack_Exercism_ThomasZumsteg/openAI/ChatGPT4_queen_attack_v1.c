#include "queen_attack.h"

static inline int valid(position_t queen) {
    return (unsigned)queen.row < 8 && (unsigned)queen.column < 8;
}

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
    if (queen_1.row == queen_2.row && queen_1.column == queen_2.column)
        return INVALID_POSITION;
    if (!valid(queen_1) || !valid(queen_2))
        return INVALID_POSITION;

    int row_diff = queen_1.row - queen_2.row;
    int column_diff = queen_1.column - queen_2.column;

    if (row_diff == 0 || column_diff == 0 || abs(row_diff) == abs(column_diff))
        return CAN_ATTACK;

    return CAN_NOT_ATTACK;
}