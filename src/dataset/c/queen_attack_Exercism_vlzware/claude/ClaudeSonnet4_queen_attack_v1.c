#include "queen_attack.h"

#define WIDTH 8

attack_status_t can_attack(position_t queen_1, position_t queen_2)
{
	// Check bounds and same position in one pass
	if (queen_1.column >= WIDTH || queen_1.row >= WIDTH ||
		queen_2.column >= WIDTH || queen_2.row >= WIDTH ||
		(queen_1.column == queen_2.column && queen_1.row == queen_2.row))
		return INVALID_POSITION;

	// Calculate differences once
	int col_diff = queen_2.column - queen_1.column;
	int row_diff = queen_2.row - queen_1.row;

	// Check same row/column or diagonal attack
	if (col_diff == 0 || row_diff == 0 || 
		(col_diff < 0 ? -col_diff : col_diff) == (row_diff < 0 ? -row_diff : row_diff))
		return CAN_ATTACK;

	return CAN_NOT_ATTACK;
}