package queenattack

import "errors"

/*CanQueenAttack determines if two queens on a chess board can attack eachother
and also determines if the placements are valid*/
func CanQueenAttack(white, black string) (bool, error) {
	if len(white) != 2 || len(black) != 2 {
		return false, errors.New("Pieces are not in a valid location")
	}
	
	if white == black {
		return false, errors.New("Pieces are not in a valid location")
	}
	
	// Inline validation and distance calculation
	if white[0] < 'a' || white[0] > 'h' || white[1] < '1' || white[1] > '8' ||
		black[0] < 'a' || black[0] > 'h' || black[1] < '1' || black[1] > '8' {
		return false, errors.New("Pieces are not in a valid location")
	}
	
	rowdist := int(white[0]) - int(black[0])
	coldist := int(white[1]) - int(black[1])
	
	if rowdist < 0 {
		rowdist = -rowdist
	}
	if coldist < 0 {
		coldist = -coldist
	}
	
	return rowdist == 0 || coldist == 0 || rowdist == coldist, nil
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
	return ('a' <= piece[0] && piece[0] <= 'h') && ('1' <= piece[1] && piece[1] <= '8')
}