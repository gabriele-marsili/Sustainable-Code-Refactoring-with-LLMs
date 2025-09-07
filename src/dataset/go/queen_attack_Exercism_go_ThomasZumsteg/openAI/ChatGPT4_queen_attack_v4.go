package queenattack

import "errors"

func CanQueenAttack(white, black string) (bool, error) {
	if white == black || !isValidPosition(white) || !isValidPosition(black) {
		return false, errors.New("Pieces are not in a valid location")
	}
	rowDist := int(white[0]) - int(black[0])
	colDist := int(white[1]) - int(black[1])
	return rowDist == 0 || colDist == 0 || abs(rowDist) == abs(colDist), nil
}

func isValidPosition(pos string) bool {
	return len(pos) == 2 && pos[0] >= 'a' && pos[0] <= 'h' && pos[1] >= '1' && pos[1] <= '8'
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}