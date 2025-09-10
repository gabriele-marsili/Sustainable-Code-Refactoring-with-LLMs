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
	if !isValidTriangle(a, b, c) {
		return NaT
	}
	if a == b && b == c {
		return Equ
	}
	if a == b || a == c || b == c {
		return Iso
	}
	return Sca
}

func isValidTriangle(a, b, c float64) bool {
	if !(a > 0 && b > 0 && c > 0 &&
		!math.IsNaN(a) && !math.IsNaN(b) && !math.IsNaN(c) &&
		!math.IsInf(a, 0) && !math.IsInf(b, 0) && !math.IsInf(c, 0)) {
		return false
	}

	return a+b >= c && a+c >= b && b+c >= a
}