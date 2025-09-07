package queenattack

import "errors"

// CanQueenAttack determines if two queens on a chess board can attack each other
// and also determines if the placements are valid.
func CanQueenAttack(white, black string) (bool, error) {
	if white == black || !isValidPosition(white) || !isValidPosition(black) {
		return false, errors.New("pieces are not in a valid location")
	}
	rowDist := abs(int(white[0]) - int(black[0]))
	colDist := abs(int(white[1]) - int(black[1]))
	return rowDist == 0 || colDist == 0 || rowDist == colDist, nil
}

// isValidPosition determines if a chess piece is on the board.
func isValidPosition(pos string) bool {
	return len(pos) == 2 && 'a' <= pos[0] && pos[0] <= 'h' && '1' <= pos[1] && pos[1] <= '8'
}

// abs calculates the absolute value of an integer.
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}