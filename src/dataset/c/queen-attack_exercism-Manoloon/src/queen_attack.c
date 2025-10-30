#include "queen_attack.h"
#include <stdlib.h>

attack_status_t can_attack(position_t queen_1, position_t queen_2) 
{
    if(queen_1.row == queen_2.row && queen_1.column == queen_2.column)
    {
        return INVALID_POSITION;
    }
    if( (queen_1.row > 7    || queen_1.column > 7)     || 
        (queen_2.row > 7    || queen_2.column > 7))
    {
        return INVALID_POSITION;
    }
    int rowDif = abs(queen_1.row - queen_2.row);
    int colDif = abs(queen_1.column - queen_2.column);
    if( rowDif == 0 || colDif == 0)
    {
        return CAN_ATTACK;
    }
    if (rowDif == colDif)
    {
        return CAN_ATTACK;
    }
    return CAN_NOT_ATTACK;
}
