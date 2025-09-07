package connect

//player plays the game of connect
type player struct {
	Name              string
	Char              byte
	GetStartPositions func([]string) []coord
	AtWinningPosition func([]string, coord) bool
}

//coord is a position on a connectBoard
type coord struct {
	Row, Col int
}

//connectBoard is board for the game of connect
type connectBoard []string

/*ResultOf determines which player has won the game of conenct.*/
func ResultOf(board connectBoard) (string, error) {
	black := player{"black", 'X', getFirstCol, atLastCol}
	white := player{"white", 'O', getFirstRow, atLastRow}
	
	boardLen := len(board)
	if boardLen == 0 {
		return "", nil
	}
	boardWidth := len(board[0])
	
	for _, p := range []player{black, white} {
		seenPos := make(map[coord]bool, boardLen*boardWidth/4) // Pre-allocate with estimated capacity
		queue := p.GetStartPositions(board)
		
		for len(queue) != 0 {
			pos := queue[0]
			queue = queue[1:]
			
			if seenPos[pos] || board[pos.Row][pos.Col] != p.Char {
				continue
			}
			
			if p.AtWinningPosition(board, pos) {
				return p.Name, nil
			}
			
			seenPos[pos] = true
			adjacent := getAdjacent(board, pos, boardLen, boardWidth)
			queue = append(queue, adjacent...)
		}
	}
	return "", nil
}

/*getAdjacent gets all valid adjacent positions.*/
func getAdjacent(b connectBoard, pos coord, boardLen, boardWidth int) []coord {
	adjacent := make([]coord, 0, 6) // Pre-allocate with max capacity
	
	directions := [6][2]int{
		{-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0},
	}
	
	for _, dir := range directions {
		newRow, newCol := pos.Row+dir[0], pos.Col+dir[1]
		if newRow >= 0 && newRow < boardLen && newCol >= 0 && newCol < boardWidth {
			adjacent = append(adjacent, coord{newRow, newCol})
		}
	}
	return adjacent
}

/*getFirstCol gets all positions in the first column of the board.*/
func getFirstCol(board []string) []coord {
	boardLen := len(board)
	firstCol := make([]coord, boardLen)
	for r := 0; r < boardLen; r++ {
		firstCol[r] = coord{r, 0}
	}
	return firstCol
}

/*getFirstRow gets all positions in the first row of the board.*/
func getFirstRow(board []string) []coord {
	if len(board) == 0 {
		return nil
	}
	boardWidth := len(board[0])
	firstRow := make([]coord, boardWidth)
	for c := 0; c < boardWidth; c++ {
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