package matrix

type Pair struct {
	row, col int
}

func (m *Matrix) Saddle() []Pair {
	rows := m.Rows()
	cols := m.Cols()
	rowMins := make([]int, len(rows))
	colMaxs := make([]int, len(cols))

	for r, row := range rows {
		rowMins[r] = row[0]
		for _, elem := range row[1:] {
			if elem < rowMins[r] {
				rowMins[r] = elem
			}
		}
	}

	for c := range cols {
		colMaxs[c] = cols[c][0]
		for _, elem := range cols[c][1:] {
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