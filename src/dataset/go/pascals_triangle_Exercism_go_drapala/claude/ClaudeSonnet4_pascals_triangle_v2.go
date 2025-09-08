package pascal

func Triangle(n int) [][]int {
	if n == 0 {
		return [][]int{}
	}
	
	result := make([][]int, n)
	
	for i := 0; i < n; i++ {
		row := make([]int, i+1)
		row[0] = 1
		row[i] = 1
		
		for j := 1; j < i; j++ {
			row[j] = result[i-1][j-1] + result[i-1][j]
		}
		
		result[i] = row
	}
	
	return result
}