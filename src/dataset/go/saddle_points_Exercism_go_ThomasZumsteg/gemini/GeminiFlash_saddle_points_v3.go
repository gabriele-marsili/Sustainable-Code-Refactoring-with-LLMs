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

	for r := 0; r < numRows; r++ {
		row := rows[r]
		for c := 0; c < numCols; c++ {
			elem := row[c]

			isSaddle := true

			// Check if element is smallest in row
			for _, val := range row {
				if val < elem {
					isSaddle = false
					break
				}
			}

			if !isSaddle {
				continue
			}

			// Check if element is largest in column
			for i := 0; i < numRows; i++ {
				if rows[i][c] > elem {
					isSaddle = false
					break
				}
			}

			if isSaddle {
				saddlePoints = append(saddlePoints, Pair{r, c})
			}
		}
	}
	return saddlePoints
}