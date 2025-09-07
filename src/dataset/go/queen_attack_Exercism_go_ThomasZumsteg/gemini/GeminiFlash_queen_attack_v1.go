package queenattack

import (
	"errors"
	"math"
)

/*CanQueenAttack determines if two queens on a chess board can attack eachother
and also determines if the placements are valid*/
func CanQueenAttack(white, black string) (bool, error) {
	if !inRange(white) || !inRange(black) {
		return false, errors.New("Pieces are not in a valid location")
	}
	if white == black {
		return false, errors.New("Pieces are not in a valid location")
	}

	rowdist, coldist := distances(white, black)
	if rowdist == 0 || coldist == 0 {
		return true, nil
	}
	return math.Abs(float64(rowdist)) == math.Abs(float64(coldist)), nil
}

/*distances calucates the distnaces between two peices on a chess board*/
func distances(white, black string) (int, int) {
	whiterow, whitecol := int(white[0]), int(white[1])
	blackrow, blackcol := int(black[0]), int(black[1])
	return whiterow - blackrow, whitecol - blackcol
}

/*inRange determines if a chess piece is on the board*/
func inRange(piece string) bool {
	if len(piece) != 2 {
		return false
	}
	return 'a' <= piece[0] && piece[0] <= 'h' && '1' <= piece[1] && piece[1] <= '8'
}