#include "queen_attack.h"
#include <stdlib.h>
#include <stdbool.h>

int valid(position_t queen) {
    return (unsigned)queen.row < 8 && (unsigned)queen.column < 8;
}

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
    if (!valid(queen_1) || !valid(queen_2)) {
        return INVALID_POSITION;
    }

    if (queen_1.row == queen_2.row && queen_1.column == queen_2.column) {
        return INVALID_POSITION;
    }

    int row_diff = abs(queen_1.row - queen_2.row);
    int column_diff = abs(queen_1.column - queen_2.column);

    if (row_diff == 0 || column_diff == 0 || row_diff == column_diff) {
        return CAN_ATTACK;
    } else {
        return CAN_NOT_ATTACK;
    }
}