#include "queen_attack.h"

#define WIDTH 8

attack_status_t can_attack(position_t queen_1, position_t queen_2)
{
	// Check bounds and same position in one pass
	if (queen_1.column >= WIDTH || queen_1.row >= WIDTH ||
		queen_2.column >= WIDTH || queen_2.row >= WIDTH)
		return INVALID_POSITION;
	
	int col_diff = queen_2.column - queen_1.column;
	int row_diff = queen_2.row - queen_1.row;
	
	// Same position check
	if (col_diff == 0 && row_diff == 0)
		return INVALID_POSITION;
	
	// Same column or row
	if (col_diff == 0 || row_diff == 0)
		return CAN_ATTACK;
	
	// Diagonal check: absolute values are equal
	if ((col_diff < 0 ? -col_diff : col_diff) == (row_diff < 0 ? -row_diff : row_diff))
		return CAN_ATTACK;
	
	return CAN_NOT_ATTACK;
}