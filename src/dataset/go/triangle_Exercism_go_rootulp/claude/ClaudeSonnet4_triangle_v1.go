package triangle

import "math"

// Notice KindFromSides() returns this type. Pick a suitable data type.
type Kind string

const (
	NaT Kind = "Not a triangle"
	Equ Kind = "Equilateral"
	Iso Kind = "Isosceles"
	Sca Kind = "Scalene"
)

func KindFromSides(a, b, c float64) Kind {
	// Early validation - check for invalid values first
	if a <= 0 || b <= 0 || c <= 0 || 
		math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) ||
		math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return NaT
	}
	
	// Triangle inequality check - inline for better performance
	if a+b < c || a+c < b || b+c < a {
		return NaT
	}
	
	// Check triangle type with minimal comparisons
	if a == b {
		if b == c {
			return Equ
		}
		return Iso
	}
	if a == c || b == c {
		return Iso
	}
	return Sca
}

func isTriangle(a, b, c float64) bool {
	if a <= 0 || b <= 0 || c <= 0 || 
		math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) ||
		math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return false
	}
	return a+b >= c && a+c >= b && b+c >= a
}

func isSumOfTwoSidesGreaterThanThirdSide(x, y, z float64) bool {
	return x+y >= z
}

func isValidSideLength(x float64) bool {
	return x > 0 && !math.IsNaN(x) && !math.IsInf(x, 1)
}