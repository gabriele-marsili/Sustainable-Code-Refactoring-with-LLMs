#include "queen_attack.h"

static inline int is_valid_position(int row, int column) {
    return (unsigned)row < 8 && (unsigned)column < 8;
}

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
    if (!is_valid_position(queen_1.row, queen_1.column) || 
        !is_valid_position(queen_2.row, queen_2.column) || 
        (queen_1.row == queen_2.row && queen_1.column == queen_2.column)) {
        return INVALID_POSITION;
    }

    int row_diff = queen_1.row - queen_2.row;
    int column_diff = queen_1.column - queen_2.column;

    return (row_diff == 0 || column_diff == 0 || abs(row_diff) == abs(column_diff)) 
           ? CAN_ATTACK 
           : CAN_NOT_ATTACK;
}