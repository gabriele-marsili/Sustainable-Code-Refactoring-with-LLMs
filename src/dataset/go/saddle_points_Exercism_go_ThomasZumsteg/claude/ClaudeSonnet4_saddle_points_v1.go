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
	for r, row := range rows {
		for c, elem := range row {
			if elem == rowMins[r] && elem == colMaxs[c] {
				saddlePoints = append(saddlePoints, Pair{r, c})
			}
		}
	}
	return saddlePoints
}

/*compare finds the element in an array that best fits some function.*/
func compare(items []int, comp func(int, int) bool) int {
	if len(items) == 0 {
		return 0
	}
	best := items[0]
	for _, item := range items[1:] {
		if comp(best, item) {
			best = item
		}
	}
	return best
}

/*min compares two elemens for smallness.*/
func min(a, b int) bool {
	return a < b
}

/*max compares two elements for bigness.*/
func max(a, b int) bool {
	return a > b
}