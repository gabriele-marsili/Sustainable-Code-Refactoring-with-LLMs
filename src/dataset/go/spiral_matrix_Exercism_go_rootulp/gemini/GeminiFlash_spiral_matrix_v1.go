package spiralmatrix

func SpiralMatrix(size int) [][]int {
	if size <= 0 {
		return [][]int{}
	}

	result := make([][]int, size)
	for i := range result {
		result[i] = make([]int, size)
	}

	numToInsert := 1
	topRow, bottomRow := 0, size-1
	leftColumn, rightColumn := 0, size-1

	for numToInsert <= size*size {
		// East
		for column := leftColumn; column <= rightColumn; column++ {
			result[topRow][column] = numToInsert
			numToInsert++
		}
		topRow++
		if topRow > bottomRow {
			break
		}

		// South
		for row := topRow; row <= bottomRow; row++ {
			result[row][rightColumn] = numToInsert
			numToInsert++
		}
		rightColumn--
		if leftColumn > rightColumn {
			break
		}

		// West
		for column := rightColumn; column >= leftColumn; column-- {
			result[bottomRow][column] = numToInsert
			numToInsert++
		}
		bottomRow--
		if topRow > bottomRow {
			break
		}

		// North
		for row := bottomRow; row >= topRow; row-- {
			result[row][leftColumn] = numToInsert
			numToInsert++
		}
		leftColumn++
		if leftColumn > rightColumn {
			break
		}
	}

	return result
}