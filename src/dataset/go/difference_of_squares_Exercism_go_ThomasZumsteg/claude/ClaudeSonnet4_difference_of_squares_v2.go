package diffsquares

/*SquareOfSums is equal to (1 + 2 + 3 + ... + n)^2
Also see triangle numbers
https://en.wikipedia.org/wiki/Triangular_number*/
func SquareOfSums(n int) int {
	sum := n * (n + 1) / 2
	return sum * sum
}

/*SumOfSquares is equal to 1^2 + 2^2 + 3^2 + ... + n^2
Also called Square pyramidal number
See: https://en.wikipedia.org/wiki/Square_pyramidal_number*/
func SumOfSquares(n int) int {
	return n * (n + 1) * (2*n + 1) / 6
}

/*Difference is the difference between SquareOfSums and SumOfSquares
(1 + 2 + 3 + ... + n)^2 - (1^2 + 2^2 + 3^2 + ... + n^2)*/
func Difference(n int) int {
	n2 := n * n
	n3 := n2 * n
	return n * (n3 - 1) * (3*n + 2) / 12
}