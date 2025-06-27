#include "queen_attack.h"

#include <stdbool.h>
#include <stdlib.h>

bool validate_position(position_t queen);
bool same_row(position_t queen_1, position_t queen_2);
bool same_column(position_t queen_1, position_t queen_2);
bool same_diagonal(position_t queen_1, position_t queen_2);

bool validate_position(position_t queen) {
    if (queen.row >= BOARD_1D) return (false);
    if (queen.column >= BOARD_1D) return (false);
    return (true);
}

bool same_row(position_t queen_1, position_t queen_2) {
    return (queen_1.row == queen_2.row);
}

bool same_column(position_t queen_1, position_t queen_2) {
    return (queen_1.column == queen_2.column);
}

bool same_diagonal(position_t queen_1, position_t queen_2) {
    uint8_t delta_row = abs(queen_1.row - queen_2.row);
    uint8_t delta_column = abs(queen_1.column - queen_2.column);
    return (delta_row == delta_column);
}

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
    if (validate_position(queen_1) == false) return (INVALID_POSITION);
    if (validate_position(queen_2) == false) return (INVALID_POSITION);
    if (same_row(queen_1, queen_2) && same_column(queen_1, queen_2))
        return (INVALID_POSITION);
    if (same_row(queen_1, queen_2)) return (CAN_ATTACK);
    if (same_column(queen_1, queen_2)) return (CAN_ATTACK);
    if (same_diagonal(queen_1, queen_2)) return (CAN_ATTACK);
    return (CAN_NOT_ATTACK);
}
