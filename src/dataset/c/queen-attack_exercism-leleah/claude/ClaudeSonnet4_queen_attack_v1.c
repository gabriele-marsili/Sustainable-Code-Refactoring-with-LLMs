#include "queen_attack.h"

attack_status_t can_attack(position_t queen_1, position_t queen_2)
{
    // Check for invalid positions first (most likely to fail fast)
    if (queen_1.row > 7 || queen_1.column > 7 || queen_2.row > 7 || queen_2.column > 7)
    {
        return INVALID_POSITION;
    }
    
    // Check if queens are on same position
    if (queen_1.row == queen_2.row && queen_1.column == queen_2.column)
    {
        return INVALID_POSITION;
    }
    
    // Calculate differences once
    int row_diff = queen_1.row - queen_2.row;
    int col_diff = queen_1.column - queen_2.column;
    
    // Check for same row or column attack
    if (row_diff == 0 || col_diff == 0)
    {
        return CAN_ATTACK;
    }
    
    // Check diagonal attack using absolute values without function call
    if ((row_diff < 0 ? -row_diff : row_diff) == (col_diff < 0 ? -col_diff : col_diff))
    {
        return CAN_ATTACK;
    }
    
    return CAN_NOT_ATTACK;
}