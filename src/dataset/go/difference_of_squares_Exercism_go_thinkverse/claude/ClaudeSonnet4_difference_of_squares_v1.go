package diffsquares

func SquareOfSum(n int) int {
	term := (n * (n + 1)) >> 1
	return term * term
}

func SumOfSquares(n int) int {
	return (n * (n + 1) * ((n << 1) + 1)) / 6
}

func Difference(n int) int {
	// Inline calculations to avoid function call overhead
	sumTerm := (n * (n + 1)) >> 1
	squareOfSum := sumTerm * sumTerm
	sumOfSquares := (n * (n + 1) * ((n << 1) + 1)) / 6
	return squareOfSum - sumOfSquares
}