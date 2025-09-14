package matrix

//Pair is a row and column in a matrix
type Pair struct {
	row, col int
}

/*Saddle finds saddle points in a matrix.*/
func (m *Matrix) Saddle() []Pair {
	rows := m.Rows()
	cols := m.Cols()
	
	if len(rows) == 0 || len(cols) == 0 {
		return nil
	}
	
	// Pre-compute row minimums and column maximums
	rowMins := make([]int, len(rows))
	colMaxs := make([]int, len(cols))
	
	// Calculate row minimums
	for i, row := range rows {
		if len(row) == 0 {
			continue
		}
		rowMins[i] = row[0]
		for _, val := range row[1:] {
			if val < rowMins[i] {
				rowMins[i] = val
			}
		}
	}
	
	// Calculate column maximums
	for j := range cols {
		if len(rows) == 0 || len(rows[0]) <= j {
			continue
		}
		colMaxs[j] = rows[0][j]
		for i := 1; i < len(rows); i++ {
			if len(rows[i]) > j && rows[i][j] > colMaxs[j] {
				colMaxs[j] = rows[i][j]
			}
		}
	}
	
	var saddlePoints []Pair
	
	// Find saddle points by comparing with pre-computed values
	for r, row := range rows {
		for c, elem := range row {
			if elem == rowMins[r] && elem == colMaxs[c] {
				saddlePoints = append(saddlePoints, Pair{r, c})
			}
		}
	}
	
	return saddlePoints
}