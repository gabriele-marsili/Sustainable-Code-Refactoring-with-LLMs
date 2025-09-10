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
		return saddlePoints // Return empty slice for empty matrix
	}

	minInRow := make([]int, numRows)
	maxInCol := make([]int, numCols)

	// Precompute minimums for each row
	for r := 0; r < numRows; r++ {
		minInRow[r] = rows[r][0]
		for c := 1; c < numCols; c++ {
			if rows[r][c] < minInRow[r] {
				minInRow[r] = rows[r][c]
			}
		}
	}

	// Precompute maximums for each column
	for c := 0; c < numCols; c++ {
		maxInCol[c] = cols[c][0]
		for r := 1; r < numRows; r++ {
			if cols[c][r] > maxInCol[c] {
				maxInCol[c] = cols[c][r]
			}
		}
	}

	// Find saddle points using precomputed minimums and maximums
	for r := 0; r < numRows; r++ {
		for c := 0; c < numCols; c++ {
			if rows[r][c] == minInRow[r] && rows[r][c] == maxInCol[c] {
				saddlePoints = append(saddlePoints, Pair{r, c})
			}
		}
	}

	return saddlePoints
}