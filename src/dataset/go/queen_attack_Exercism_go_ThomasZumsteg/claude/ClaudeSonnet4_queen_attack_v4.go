package queenattack

import "errors"

var validationError = errors.New("Pieces are not in a valid location")

func CanQueenAttack(white, black string) (bool, error) {
	if len(white) != 2 || len(black) != 2 {
		return false, validationError
	}
	
	wr, wc := white[0], white[1]
	br, bc := black[0], black[1]
	
	if wr < 'a' || wr > 'h' || wc < '1' || wc > '8' ||
		br < 'a' || br > 'h' || bc < '1' || bc > '8' ||
		white == black {
		return false, validationError
	}
	
	rowdist := int(wr - br)
	coldist := int(wc - bc)
	
	if rowdist < 0 {
		rowdist = -rowdist
	}
	if coldist < 0 {
		coldist = -coldist
	}
	
	return rowdist == 0 || coldist == 0 || rowdist == coldist, nil
}

func distances(white, black string) (int, int) {
	return int(white[0]) - int(black[0]), int(white[1]) - int(black[1])
}

func inRange(piece string) bool {
	return len(piece) == 2 &&
		piece[0] >= 'a' && piece[0] <= 'h' &&
		piece[1] >= '1' && piece[1] <= '8'
}