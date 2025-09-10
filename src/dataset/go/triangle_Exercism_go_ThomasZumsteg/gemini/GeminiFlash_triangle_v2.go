package triangle

import (
	"math"
)

/*KindFromSides determines the type of triangle formed by sides a, b and c
the triangle is invaid if the longest side is equal or longer than the shorter sides
or any of the sides are invalid (0 or less, NaN or Inf+)*/
func KindFromSides(a, b, c float64) Kind {
	if math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) ||
		a <= 0 || b <= 0 || c <= 0 ||
		math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return NaT
	}

	// Optimization: Find the longest side without sorting
	maxSide := a
	if b > maxSide {
		maxSide = b
	}
	if c > maxSide {
		maxSide = c
	}

	// Optimization: Check triangle inequality early
	if a+b <= maxSide || a+c <= maxSide || b+c <= maxSide {
		return NaT
	}

	if a == b && b == c {
		return Equ
	} else if a == b || a == c || b == c {
		return Iso
	} else {
		return Sca
	}
}

// Kind is an enumerated type for triangle kinds
type Kind int

// Types of triangles (an enumareted list)
const (
	Equ = iota // equilateral
	Iso        // isosceles
	Sca        // scalene
	NaT        // not a triangle
)