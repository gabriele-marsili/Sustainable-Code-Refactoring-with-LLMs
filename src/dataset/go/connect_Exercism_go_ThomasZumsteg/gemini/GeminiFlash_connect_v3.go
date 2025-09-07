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

/*ResultOf determines which player has won the game of conenct.*/
func ResultOf(board connectBoard) (string, error) {
	black := player{"black", 'X', getFirstCol, atLastCol}
	white := player{"white", 'O', getFirstRow, atLastRow}

	width := len(board[0])
	height := len(board)

	for _, p := range []player{black, white} {
		startPositions := p.GetStartPositions(board)
		seenPos := make(map[coord]bool)
		queue := startPositions
		for len(queue) > 0 {
			pos := queue[0]
			queue = queue[1:]

			if seenPos[pos] || board[pos.Row][pos.Col] != p.Char {
				continue
			}

			if p.AtWinningPosition(board, pos) {
				return p.Name, nil
			}

			seenPos[pos] = true

			adjacent := bGetAdjacent(board, pos, width, height)
			queue = append(queue, adjacent...)
		}
	}

	return "", nil
}

/*getAdjacent gets all valid adjacent positions.*/
func bGetAdjacent(b connectBoard, pos coord, width, height int) []coord {
	adjacent := make([]coord, 0, 6)
	row := pos.Row
	col := pos.Col

	if row > 0 {
		adjacent = append(adjacent, coord{row - 1, col})
		if col < width-1 {
			adjacent = append(adjacent, coord{row - 1, col + 1})
		}
	}
	if col > 0 {
		adjacent = append(adjacent, coord{row, col - 1})
		if row < height-1 {
			adjacent = append(adjacent, coord{row + 1, col - 1})
		}
	}
	if col < width-1 {
		adjacent = append(adjacent, coord{row, col + 1})
	}
	if row < height-1 {
		adjacent = append(adjacent, coord{row + 1, col})
	}

	return adjacent
}

/*getFirstCol gets all positions in the first column of the board.*/
func getFirstCol(board []string) []coord {
	height := len(board)
	firstCol := make([]coord, height)
	for r := 0; r < height; r++ {
		firstCol[r] = coord{r, 0}
	}
	return firstCol
}

/*getFirstRow gets all positions in the first row of the board.*/
func getFirstRow(board []string) []coord {
	width := len(board[0])
	firstRow := make([]coord, width)
	for c := 0; c < width; c++ {
		firstRow[c] = coord{0, c}
	}
	return firstRow
}

/*atLastCol if a position is at the last column of a board.*/
func atLastCol(board []string, pos coord) bool {
	return pos.Col == len(board[pos.Row])-1
}

/*atLastRow if a position is at the last row of a board.*/
func atLastRow(board []string, pos coord) bool {
	return pos.Row == len(board)-1
}