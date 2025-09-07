package connect

type player struct {
	Name              string
	Char              byte
	GetStartPositions func([]string) []coord
	AtWinningPosition func([]string, coord) bool
}

type coord struct {
	Row, Col int
}

type connectBoard []string

var adjacentOffsets = [6][2]int{
	{-1, 0}, {-1, 1},
	{0, -1}, {0, 1},
	{1, -1}, {1, 0},
}

func ResultOf(board connectBoard) (string, error) {
	black := player{"black", 'X', getFirstCol, atLastCol}
	white := player{"white", 'O', getFirstRow, atLastRow}
	
	boardHeight := len(board)
	boardWidth := len(board[0])
	
	for _, p := range [2]player{black, white} {
		seenPos := make(map[coord]bool, boardHeight*boardWidth/4)
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
			
			for _, offset := range adjacentOffsets {
				newRow := pos.Row + offset[0]
				newCol := pos.Col + offset[1]
				
				if newRow >= 0 && newRow < boardHeight && 
				   newCol >= 0 && newCol < boardWidth {
					newPos := coord{newRow, newCol}
					if !seenPos[newPos] {
						queue = append(queue, newPos)
					}
				}
			}
		}
	}
	return "", nil
}

func (b connectBoard) getAdjacent(pos coord) []coord {
	boardHeight := len(b)
	boardWidth := len(b[0])
	adjacent := make([]coord, 0, 6)
	
	for _, offset := range adjacentOffsets {
		newRow := pos.Row + offset[0]
		newCol := pos.Col + offset[1]
		
		if newRow >= 0 && newRow < boardHeight && 
		   newCol >= 0 && newCol < boardWidth {
			adjacent = append(adjacent, coord{newRow, newCol})
		}
	}
	return adjacent
}

func getFirstCol(board []string) []coord {
	firstCol := make([]coord, len(board))
	for r := 0; r < len(board); r++ {
		firstCol[r] = coord{r, 0}
	}
	return firstCol
}

func getFirstRow(board []string) []coord {
	firstRow := make([]coord, len(board[0]))
	for c := 0; c < len(board[0]); c++ {
		firstRow[c] = coord{0, c}
	}
	return firstRow
}

func atLastCol(board []string, pos coord) bool {
	return pos.Col == len(board[pos.Row])-1
}

func atLastRow(board []string, pos coord) bool {
	return pos.Row == len(board)-1
}