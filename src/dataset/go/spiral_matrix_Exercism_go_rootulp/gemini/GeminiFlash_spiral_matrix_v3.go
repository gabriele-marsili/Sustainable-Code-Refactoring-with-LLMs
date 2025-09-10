package spiralmatrix

type direction int

const (
	east direction = iota
	south
	west
	north
)

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
	dir := east
	topRow := 0
	bottomRow := size - 1
	leftColumn := 0
	rightColumn := size - 1

	for topRow <= bottomRow && leftColumn <= rightColumn {
		switch dir {
		case east:
			for column := leftColumn; column <= rightColumn; column++ {
				result[topRow][column] = numToInsert
				numToInsert++
			}
			topRow++
		case south:
			for row := topRow; row <= bottomRow; row++ {
				result[row][rightColumn] = numToInsert
				numToInsert++
			}
			rightColumn--
		case west:
			for column := rightColumn; column >= leftColumn; column-- {
				result[bottomRow][column] = numToInsert
				numToInsert++
			}
			bottomRow--
		case north:
			for row := bottomRow; row >= topRow; row-- {
				result[row][leftColumn] = numToInsert
				numToInsert++
			}
			leftColumn++
		}
		dir = (dir + 1) % 4
	}
	return result
}