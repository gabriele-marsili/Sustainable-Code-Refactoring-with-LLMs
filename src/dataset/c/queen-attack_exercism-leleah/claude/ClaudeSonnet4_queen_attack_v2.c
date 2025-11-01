#include "queen_attack.h"

attack_status_t can_attack(position_t queen_1, position_t queen_2)
{
    // Check for invalid positions (out of bounds 0-7)
    if ((queen_1.row | queen_1.column | queen_2.row | queen_2.column) > 7)
    {
        return INVALID_POSITION;
    }
    
    // Check if queens are on same position
    if ((queen_1.row == queen_2.row) & (queen_1.column == queen_2.column))
    {
        return INVALID_POSITION;
    }
    
    int row_diff = queen_1.row - queen_2.row;
    int col_diff = queen_1.column - queen_2.column;
    
    // Check if on same row, column, or diagonal
    if ((row_diff == 0) | (col_diff == 0) | ((row_diff ^ col_diff) == 0) | ((row_diff ^ -col_diff) == 0))
    {
        return CAN_ATTACK;
    }
    
    return CAN_NOT_ATTACK;
}