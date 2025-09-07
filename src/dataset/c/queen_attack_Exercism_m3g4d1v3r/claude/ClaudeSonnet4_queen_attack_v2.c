#include "queen_attack.h"

#include <stdbool.h>
#include <stdlib.h>

attack_status_t can_attack(position_t queen_1, position_t queen_2) {
    // Validate positions inline
    if (queen_1.row >= BOARD_1D || queen_1.column >= BOARD_1D ||
        queen_2.row >= BOARD_1D || queen_2.column >= BOARD_1D) {
        return INVALID_POSITION;
    }
    
    // Check if queens are on same position
    if (queen_1.row == queen_2.row && queen_1.column == queen_2.column) {
        return INVALID_POSITION;
    }
    
    // Check attacks in single pass
    if (queen_1.row == queen_2.row || 
        queen_1.column == queen_2.column ||
        abs(queen_1.row - queen_2.row) == abs(queen_1.column - queen_2.column)) {
        return CAN_ATTACK;
    }
    
    return CAN_NOT_ATTACK;
}