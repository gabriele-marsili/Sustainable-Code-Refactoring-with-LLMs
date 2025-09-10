package spiralmatrix

func SpiralMatrix(depth int) [][]int {
	result := make([][]int, depth)
	for i := range result {
		result[i] = make([]int, depth)
	}
	row, col, dr, dc := 0, 0, 0, 1
	for i := 1; i <= depth*depth; i++ {
		result[row][col] = i
		nextRow, nextCol := row+dr, col+dc
		if nextRow < 0 || nextRow >= depth || nextCol < 0 || nextCol >= depth || result[nextRow][nextCol] != 0 {
			dr, dc = dc, -dr
		}
		row, col = row+dr, col+dc
	}
	return result
}