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
	
	for _, p := range []player{black, white} {
		seenPos := make(map[coord]bool, boardLen*len(board[0]))
		queue := p.GetStartPositions(board)
		
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
			adjacent := board.getAdjacent(pos)
			queue = append(queue, adjacent...)
		}
	}
	return "", nil
}

/*getAdjacent gets all valid adjacent positions.*/
func (b connectBoard) getAdjacent(pos coord) []coord {
	boardLen := len(b)
	if boardLen == 0 {
		return nil
	}
	rowLen := len(b[0])
	
	adjacent := make([]coord, 0, 6)
	
	directions := [6][2]int{
		{-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0},
	}
	
	for _, dir := range directions {
		newRow := pos.Row + dir[0]
		newCol := pos.Col + dir[1]
		
		if newRow >= 0 && newRow < boardLen && newCol >= 0 && newCol < rowLen {
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
	rowLen := len(board[0])
	firstRow := make([]coord, rowLen)
	for c := 0; c < rowLen; c++ {
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