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
	
	wr, wc := white[0], white[1]
	br, bc := black[0], black[1]
	
	if wr < 'a' || wr > 'h' || wc < '1' || wc > '8' ||
		br < 'a' || br > 'h' || bc < '1' || bc > '8' {
		return false, errors.New("Pieces are not in a valid location")
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