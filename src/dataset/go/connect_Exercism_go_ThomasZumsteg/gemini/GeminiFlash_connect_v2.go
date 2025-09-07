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
	height := len(board)
	if height == 0 {
		return "", nil // Or an error, depending on desired behavior for empty boards
	}
	width := len(board[0])

	black := player{"black", 'X', getFirstCol, atLastCol}
	white := player{"white", 'O', getFirstRow, atLastRow}

	for _, p := range []player{black, white} {
		seenPos := make(map[coord]bool)
		queue := p.GetStartPositions(board)

		for len(queue) > 0 {
			pos := queue[0]
			queue = queue[1:]

			if _, ok := seenPos[pos]; ok {
				continue
			}

			if pos.Row < 0 || pos.Row >= height || pos.Col < 0 || pos.Col >= width || board[pos.Row][pos.Col] != p.Char {
				continue
			}

			if p.AtWinningPosition(board, pos) {
				return p.Name, nil
			}

			seenPos[pos] = true

			adjacent := getAdjacent(board, pos, height, width)
			queue = append(queue, adjacent...)
		}
	}

	return "", nil
}

/*getAdjacent gets all valid adjacent positions.*/
func getAdjacent(b connectBoard, pos coord, height, width int) []coord {
	adjacent := make([]coord, 0, 6) // Pre-allocate for efficiency
	newPos := [6]coord{
		{pos.Row - 1, pos.Col}, {pos.Row - 1, pos.Col + 1},
		{pos.Row, pos.Col - 1}, {pos.Row, pos.Col + 1},
		{pos.Row + 1, pos.Col - 1}, {pos.Row + 1, pos.Col},
	}

	for _, p := range newPos {
		if p.Row >= 0 && p.Row < height && p.Col >= 0 && p.Col < width {
			adjacent = append(adjacent, p)
		}
	}
	return adjacent
}

/*getFirstCol gets all positions in the first column of the board.*/
func getFirstCol(board []string) []coord {
	firstCol := make([]coord, len(board))
	for r := range board {
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