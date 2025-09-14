package matrix

type Pair struct {
	row, col int
}

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
		for _, val := range row[1:] {
			if val < rowMins[r] {
				rowMins[r] = val
			}
		}
	}
	
	for c := range cols {
		if len(cols[c]) == 0 {
			continue
		}
		colMaxs[c] = cols[c][0]
		for _, val := range cols[c][1:] {
			if val > colMaxs[c] {
				colMaxs[c] = val
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

func min(a, b int) bool {
	return a < b
}

func max(a, b int) bool {
	return a > b
}