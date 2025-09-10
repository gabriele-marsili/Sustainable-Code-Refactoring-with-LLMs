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

func isValidTriangle(a, b, c float64) bool {
	if !isValidSide(a) || !isValidSide(b) || !isValidSide(c) {
		return false
	}
	return a+b >= c && a+c >= b && b+c >= a
}

func isValidSide(x float64) bool {
	return x > 0 && !math.IsNaN(x) && !math.IsInf(x, 0)
}