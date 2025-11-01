#include "queen_attack.h"

attack_status_t can_attack(position_t queen_1, position_t queen_2) 
{
    // Check for same position first (most likely to fail fast)
    if(queen_1.row == queen_2.row && queen_1.column == queen_2.column)
    {
        return INVALID_POSITION;
    }
    
    // Check bounds for both queens in single condition
    if((queen_1.row | queen_1.column | queen_2.row | queen_2.column) > 7)
    {
        return INVALID_POSITION;
    }
    
    // Calculate differences without abs() function call
    int rowDif = queen_1.row - queen_2.row;
    int colDif = queen_1.column - queen_2.column;
    
    // Make positive without function call
    if(rowDif < 0) rowDif = -rowDif;
    if(colDif < 0) colDif = -colDif;
    
    // Check attack conditions: same row/column or diagonal
    if(rowDif == 0 || colDif == 0 || rowDif == colDif)
    {
        return CAN_ATTACK;
    }
    
    return CAN_NOT_ATTACK;
}