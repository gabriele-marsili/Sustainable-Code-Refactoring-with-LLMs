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
			queue = append(queue, board.getAdjacent(pos)...)
		}
	}
	return "", nil
}

func (b connectBoard) getAdjacent(pos coord) []coord {
	newPos := []coord{
		{pos.Row - 1, pos.Col}, {pos.Row - 1, pos.Col + 1},
		{pos.Row, pos.Col - 1}, {pos.Row, pos.Col + 1},
		{pos.Row + 1, pos.Col - 1}, {pos.Row + 1, pos.Col},
	}
	adjacent := make([]coord, 0, 6)
	for _, p := range newPos {
		if p.Row >= 0 && p.Row < len(b) && p.Col >= 0 && p.Col < len(b[p.Row]) {
			adjacent = append(adjacent, p)
		}
	}
	return adjacent
}

func getFirstCol(board []string) []coord {
	firstCol := make([]coord, 0, len(board))
	for r := range board {
		firstCol = append(firstCol, coord{r, 0})
	}
	return firstCol
}

func getFirstRow(board []string) []coord {
	firstRow := make([]coord, 0, len(board[0]))
	for c := range board[0] {
		firstRow = append(firstRow, coord{0, c})
	}
	return firstRow
}

func atLastCol(board []string, pos coord) bool {
	return pos.Col == len(board[pos.Row])-1
}

func atLastRow(board []string, pos coord) bool {
	return pos.Row == len(board)-1
}