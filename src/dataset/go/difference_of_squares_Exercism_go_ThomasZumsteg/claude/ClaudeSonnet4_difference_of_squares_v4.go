package diffsquares

func SquareOfSums(n int) int {
	sum := n * (n + 1) >> 1
	return sum * sum
}

func SumOfSquares(n int) int {
	return n * (n + 1) * (2*n + 1) / 6
}

func Difference(n int) int {
	sum := n * (n + 1) >> 1
	return sum*sum - n*(n+1)*(2*n+1)/6
}