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
	
	rowMins := make([]int, len(rows))
	colMaxs := make([]int, len(cols))
	
	for r, row := range rows {
		if len(row) == 0 {
			continue
		}
		rowMins[r] = row[0]
		for _, elem := range row[1:] {
			if elem < rowMins[r] {
				rowMins[r] = elem
			}
		}
	}
	
	for c, col := range cols {
		if len(col) == 0 {
			continue
		}
		colMaxs[c] = col[0]
		for _, elem := range col[1:] {
			if elem > colMaxs[c] {
				colMaxs[c] = elem
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