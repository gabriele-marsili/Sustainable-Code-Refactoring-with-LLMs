package diffsquares

// SquareOfSum returns (1 + 2 + ... + n) ^ 2
func SquareOfSum(n int) int {
	sum := n * (n + 1) / 2
	return sum * sum
}

// SumOfSquares returns 1^2 + 2^2 + ... + n^2
func SumOfSquares(n int) int {
	return n * (n + 1) * (2*n + 1) / 6
}

// Difference returns the difference between the SquareOfSum(n) and SumOfSquares(n)
func Difference(n int) int {
	// Using the mathematical identity: (sum of 1 to n)^2 - (sum of squares 1 to n) = n(n+1)(n-1)(3n+2)/12
	return n * (n + 1) * (n - 1) * (3*n + 2) / 12
}