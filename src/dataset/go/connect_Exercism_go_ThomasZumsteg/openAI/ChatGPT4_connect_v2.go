package connect

// player plays the game of connect
type player struct {
	Name              string
	Char              byte
	GetStartPositions func([]string) []coord
	AtWinningPosition func([]string, coord) bool
}

// coord is a position on a connectBoard
type coord struct {
	Row, Col int
}

// connectBoard is board for the game of connect
type connectBoard []string

/* ResultOf determines which player has won the game of connect. */
func ResultOf(board connectBoard) (string, error) {
	black := player{"black", 'X', getFirstCol, atLastCol}
	white := player{"white", 'O', getFirstRow, atLastRow}
	for _, p := range []player{black, white} {
		seenPos := make(map[coord]struct{})
		queue := p.GetStartPositions(board)
		for len(queue) > 0 {
			pos := queue[0]
			queue = queue[1:]
			if _, seen := seenPos[pos]; seen || board[pos.Row][pos.Col] != p.Char {
				continue
			}
			if p.AtWinningPosition(board, pos) {
				return p.Name, nil
			}
			seenPos[pos] = struct{}{}
			queue = append(queue, board.getAdjacent(pos, seenPos)...)
		}
	}
	return "", nil
}

/* getAdjacent gets all valid adjacent positions. */
func (b connectBoard) getAdjacent(pos coord, seenPos map[coord]struct{}) []coord {
	directions := [6]coord{
		{-1, 0}, {-1, 1}, {0, -1},
		{0, 1}, {1, -1}, {1, 0},
	}
	var adjacent []coord
	for _, d := range directions {
		newPos := coord{pos.Row + d.Row, pos.Col + d.Col}
		if newPos.Row >= 0 && newPos.Row < len(b) &&
			newPos.Col >= 0 && newPos.Col < len(b[newPos.Row]) &&
			board[newPos.Row][newPos.Col] != ' ' {
			if _, seen := seenPos[newPos]; !seen {
				adjacent = append(adjacent, newPos)
			}
		}
	}
	return adjacent
}

/* getFirstCol gets all positions in the first column of the board. */
func getFirstCol(board []string) []coord {
	var firstCol []coord
	for r := range board {
		if board[r][0] == 'X' {
			firstCol = append(firstCol, coord{r, 0})
		}
	}
	return firstCol
}

/* getFirstRow gets all positions in the first row of the board. */
func getFirstRow(board []string) []coord {
	var firstRow []coord
	for c := range board[0] {
		if board[0][c] == 'O' {
			firstRow = append(firstRow, coord{0, c})
		}
	}
	return firstRow
}

/* atLastCol checks if a position is at the last column of a board. */
func atLastCol(board []string, pos coord) bool {
	return pos.Col == len(board[pos.Row])-1
}

/* atLastRow checks if a position is at the last row of a board. */
func atLastRow(board []string, pos coord) bool {
	return pos.Row == len(board)-1
}