package pascal

func Triangle(n int) [][]int {
	triangle := make([][]int, n)
	triangle[0] = []int{1}

	for i := 1; i < n; i++ {
		currentRow := make([]int, i+1)
		currentRow[0], currentRow[i] = 1, 1
		previousRow := triangle[i-1]

		for j := 1; j < i; j++ {
			currentRow[j] = previousRow[j-1] + previousRow[j]
		}

		triangle[i] = currentRow
	}

	return triangle
}