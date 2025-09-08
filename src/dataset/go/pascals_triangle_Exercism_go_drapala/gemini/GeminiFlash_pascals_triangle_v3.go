package pascal

func Triangle(n int) [][]int {
	if n <= 0 {
		return [][]int{}
	}

	result := make([][]int, n)
	result[0] = []int{1}

	for i := 1; i < n; i++ {
		row := make([]int, i+1)
		row[0] = 1
		row[i] = 1

		prevRow := result[i-1]
		for j := 1; j < i; j++ {
			row[j] = prevRow[j-1] + prevRow[j]
		}
		result[i] = row
	}
	return result
}