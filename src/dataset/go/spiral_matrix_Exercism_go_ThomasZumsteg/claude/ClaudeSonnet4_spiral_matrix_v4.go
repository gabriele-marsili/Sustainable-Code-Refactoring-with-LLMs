package spiralmatrix

func SpiralMatrix(depth int) [][]int {
	if depth <= 0 {
		return [][]int{}
	}
	
	result := make([][]int, depth)
	for i := range result {
		result[i] = make([]int, depth)
	}
	
	top, bottom, left, right := 0, depth-1, 0, depth-1
	num := 1
	
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