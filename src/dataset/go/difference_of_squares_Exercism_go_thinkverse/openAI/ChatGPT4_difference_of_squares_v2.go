package diffsquares

func SquareOfSum(n int) int {
	return (n * (n + 1) / 2) * (n * (n + 1) / 2)
}

func SumOfSquares(n int) int {
	return n * (n + 1) * (2*n + 1) / 6
}

func Difference(n int) int {
	squareOfSum := (n * (n + 1) / 2)
	squareOfSum *= squareOfSum
	sumOfSquares := n * (n + 1) * (2*n + 1) / 6
	return squareOfSum - sumOfSquares
}