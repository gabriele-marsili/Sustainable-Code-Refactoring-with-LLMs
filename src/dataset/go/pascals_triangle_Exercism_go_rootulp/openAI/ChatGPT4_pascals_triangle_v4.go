package pascal

func Triangle(n int) [][]int {
	result := make([][]int, n)
	result[0] = []int{1}

	for i := 1; i < n; i++ {
		currentRow := make([]int, i+1)
		currentRow[0], currentRow[i] = 1, 1
		previousRow := result[i-1]

		for j := 1; j < i; j++ {
			currentRow[j] = previousRow[j-1] + previousRow[j]
		}

		result[i] = currentRow
	}

	return result
}