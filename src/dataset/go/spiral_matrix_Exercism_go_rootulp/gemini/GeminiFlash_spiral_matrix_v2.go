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
	topRow := 0
	bottomRow := size - 1
	leftColumn := 0
	rightColumn := size - 1

	for topRow <= bottomRow && leftColumn <= rightColumn {
		// East
		for column := leftColumn; column <= rightColumn; column++ {
			result[topRow][column] = numToInsert
			numToInsert++
		}
		topRow++

		// South
		for row := topRow; row <= bottomRow; row++ {
			result[row][rightColumn] = numToInsert
			numToInsert++
		}
		rightColumn--

		// West
		for column := rightColumn; column >= leftColumn; column-- {
			result[bottomRow][column] = numToInsert
			numToInsert++
		}
		bottomRow--

		// North
		for row := bottomRow; row >= topRow; row-- {
			result[row][leftColumn] = numToInsert
			numToInsert++
		}
		leftColumn++
	}
	return result
}