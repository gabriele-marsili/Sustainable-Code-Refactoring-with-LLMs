package diffsquares

func SquareOfSums(n int) int {
	sum := n * (n + 1) / 2
	return sum * sum
}

func SumOfSquares(n int) int {
	return n * (n + 1) * (2*n + 1) / 6
}

func Difference(n int) int {
	sum := n * (n + 1) / 2
	squareOfSums := sum * sum
	sumOfSquares := n * (n + 1) * (2*n + 1) / 6
	return squareOfSums - sumOfSquares
}