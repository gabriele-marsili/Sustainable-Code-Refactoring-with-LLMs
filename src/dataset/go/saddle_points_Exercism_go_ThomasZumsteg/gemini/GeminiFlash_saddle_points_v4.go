package matrix

// Pair is a row and column in a matrix
type Pair struct {
	row, col int
}

/*Saddle finds saddle points in a matrix.*/
func (m *Matrix) Saddle() []Pair {
	var saddlePoints []Pair
	rows := m.Rows()
	cols := m.Cols()
	numRows := len(rows)
	numCols := len(cols)

	if numRows == 0 || numCols == 0 {
		return saddlePoints
	}

	minInRow := make([]int, numRows)
	maxInCol := make([]int, numCols)

	for i := 0; i < numRows; i++ {
		minInRow[i] = rows[i][0]
		for j := 1; j < len(rows[i]); j++ {
			if rows[i][j] < minInRow[i] {
				minInRow[i] = rows[i][j]
			}
		}
	}

	for i := 0; i < numCols; i++ {
		maxInCol[i] = cols[i][0]
		for j := 1; j < len(cols[i]); j++ {
			if cols[i][j] > maxInCol[i] {
				maxInCol[i] = cols[i][j]
			}
		}
	}

	for r := 0; r < numRows; r++ {
		for c := 0; c < numCols; c++ {
			if rows[r][c] == minInRow[r] && rows[r][c] == maxInCol[c] {
				saddlePoints = append(saddlePoints, Pair{r, c})
			}
		}
	}

	return saddlePoints
}