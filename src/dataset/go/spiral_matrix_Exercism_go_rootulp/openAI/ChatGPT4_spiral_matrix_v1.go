package spiralmatrix

func SpiralMatrix(size int) (result [][]int) {
	if size == 0 {
		return [][]int{}
	}
	if size == 1 {
		return [][]int{{1}}
	}

	result = make([][]int, size)
	for i := range result {
		result[i] = make([]int, size)
	}

	numToInsert := 1
	topRow, bottomRow := 0, size-1
	leftColumn, rightColumn := 0, size-1

	for topRow <= bottomRow && leftColumn <= rightColumn {
		// Move east
		for column := leftColumn; column <= rightColumn; column++ {
			result[topRow][column] = numToInsert
			numToInsert++
		}
		topRow++

		// Move south
		for row := topRow; row <= bottomRow; row++ {
			result[row][rightColumn] = numToInsert
			numToInsert++
		}
		rightColumn--

		// Move west
		if topRow <= bottomRow {
			for column := rightColumn; column >= leftColumn; column-- {
				result[bottomRow][column] = numToInsert
				numToInsert++
			}
			bottomRow--
		}

		// Move north
		if leftColumn <= rightColumn {
			for row := bottomRow; row >= topRow; row-- {
				result[row][leftColumn] = numToInsert
				numToInsert++
			}
			leftColumn++
		}
	}

	return result
}