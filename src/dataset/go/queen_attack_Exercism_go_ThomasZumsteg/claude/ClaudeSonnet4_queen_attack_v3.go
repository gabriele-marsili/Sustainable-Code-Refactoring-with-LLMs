package queenattack

import "errors"

var validationError = errors.New("Pieces are not in a valid location")

func CanQueenAttack(white, black string) (bool, error) {
	if len(white) != 2 || len(black) != 2 {
		return false, validationError
	}
	
	if white == black {
		return false, validationError
	}
	
	w0, w1, b0, b1 := white[0], white[1], black[0], black[1]
	
	if w0 < 'a' || w0 > 'h' || w1 < '1' || w1 > '8' ||
		b0 < 'a' || b0 > 'h' || b1 < '1' || b1 > '8' {
		return false, validationError
	}
	
	rowdist := int(w0 - b0)
	coldist := int(w1 - b1)
	
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