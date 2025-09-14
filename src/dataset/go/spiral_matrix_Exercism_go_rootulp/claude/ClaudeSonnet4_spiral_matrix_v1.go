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
		if topRow <= bottomRow {
			for column := rightColumn; column >= leftColumn; column-- {
				result[bottomRow][column] = numToInsert
				numToInsert++
			}
			bottomRow--
		}

		// North
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

func initMatrix(size int) (matrix [][]int) {
	matrix = make([][]int, size)
	for i := range matrix {
		matrix[i] = make([]int, size)
	}
	return matrix
}

func advanceClockwise(dir direction) direction {
	switch dir {
	case east:
		return south
	case south:
		return west
	case west:
		return north
	case north:
		return east
	default:
		return "invalid direction"
	}
}

type direction string

const east direction = "east"
const south direction = "south"
const west direction = "west"
const north direction = "north"