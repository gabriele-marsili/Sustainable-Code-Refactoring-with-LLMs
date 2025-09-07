package queenattack

import "errors"

/*CanQueenAttack determines if two queens on a chess board can attack eachother
and also determines if the placements are valid*/
func CanQueenAttack(white, black string) (bool, error) {
	if !inRange(white) || !inRange(black) {
		return false, errors.New("Pieces are not in a valid location")
	}
	if white == black {
		return false, errors.New("Pieces are not in a valid location")
	}

	rowDist, colDist := distances(white, black)
	if rowDist == 0 || colDist == 0 || rowDist == colDist || rowDist == -colDist {
		return true, nil
	}
	return false, nil
}

/*distances calucates the distnaces between two peices on a chess board*/
func distances(white, black string) (int, int) {
	return int(white[0] - black[0]), int(white[1] - black[1])
}

/*inRange determines if a chess piece is on the board*/
func inRange(piece string) bool {
	return len(piece) == 2 &&
		piece[0] >= 'a' && piece[0] <= 'h' &&
		piece[1] >= '1' && piece[1] <= '8'
}