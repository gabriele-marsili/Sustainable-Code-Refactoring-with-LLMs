#include "queen_attack.h"

attack_status_t can_attack(position_t queen_1, position_t queen_2) 
{
    // Check for same position first (most likely to fail fast)
    if(queen_1.row == queen_2.row && queen_1.column == queen_2.column)
    {
        return INVALID_POSITION;
    }
    
    // Check bounds using bitwise operations (more efficient than comparisons)
    if( (queen_1.row | queen_1.column | queen_2.row | queen_2.column) > 7)
    {
        return INVALID_POSITION;
    }
    
    // Calculate differences without abs() function call
    int rowDif = queen_1.row - queen_2.row;
    int colDif = queen_1.column - queen_2.column;
    
    // Use bitwise operations to get absolute values
    rowDif = (rowDif ^ (rowDif >> 31)) - (rowDif >> 31);
    colDif = (colDif ^ (colDif >> 31)) - (colDif >> 31);
    
    // Combined check for attack conditions
    if(rowDif == 0 || colDif == 0 || rowDif == colDif)
    {
        return CAN_ATTACK;
    }
    
    return CAN_NOT_ATTACK;
}