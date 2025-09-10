package triangle

import "math"

type Kind string

const (
	NaT Kind = "Not a triangle"
	Equ Kind = "Equilateral"
	Iso Kind = "Isosceles"
	Sca Kind = "Scalene"
)

func KindFromSides(a, b, c float64) Kind {
	if a <= 0 || b <= 0 || c <= 0 || math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) || math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return NaT
	}
	if a+b < c || a+c < b || b+c < a {
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