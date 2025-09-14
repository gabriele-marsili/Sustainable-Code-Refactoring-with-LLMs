package spiralmatrix

func SpiralMatrix(size int) [][]int {
	if size == 0 {
		return [][]int{}
	}
	if size == 1 {
		return [][]int{{1}}
	}

	result := make([][]int, size)
	for i := range result {
		result[i] = make([]int, size)
	}

	num := 1
	top, bottom := 0, size-1
	left, right := 0, size-1

	for top <= bottom && left <= right {
		for col := left; col <= right; col++ {
			result[top][col] = num
			num++
		}
		top++

		for row := top; row <= bottom; row++ {
			result[row][right] = num
			num++
		}
		right--

		if top <= bottom {
			for col := right; col >= left; col-- {
				result[bottom][col] = num
				num++
			}
			bottom--
		}

		if left <= right {
			for row := bottom; row >= top; row-- {
				result[row][left] = num
				num++
			}
			left++
		}
	}

	return result
}