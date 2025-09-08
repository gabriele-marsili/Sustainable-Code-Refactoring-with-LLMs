package pascal

func Triangle(n int) [][]int {
	result := make([][]int, n)
	for i := 0; i < n; i++ {
		row := make([]int, i+1)
		row[0], row[i] = 1, 1 // Set first and last elements to 1
		for j := 1; j < i; j++ {
			row[j] = result[i-1][j-1] + result[i-1][j] // Calculate middle elements
		}
		result[i] = row
	}
	return result
}