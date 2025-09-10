package triangle

import "math"

// Kind is an enumerated type for triangle kinds
type Kind int

// Types of triangles (an enumerated list)
const (
	NaT Kind = iota // not a triangle
	Equ             // equilateral
	Iso             // isosceles
	Sca             // scalene
)

/*KindFromSides determines the type of triangle formed by sides a, b and c
the triangle is invalid if the longest side is equal or longer than the shorter sides
or any of the sides are invalid (0 or less, NaN or Inf+)*/
func KindFromSides(a, b, c float64) Kind {
	if a <= 0 || b <= 0 || c <= 0 || math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) ||
		math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return NaT
	}

	// Ensure a <= b <= c without sorting
	if a > b {
		a, b = b, a
	}
	if b > c {
		b, c = c, b
	}
	if a > b {
		a, b = b, a
	}

	if a+b <= c {
		return NaT
	}
	if a == b && b == c {
		return Equ
	}
	if a == b || b == c {
		return Iso
	}
	return Sca
}