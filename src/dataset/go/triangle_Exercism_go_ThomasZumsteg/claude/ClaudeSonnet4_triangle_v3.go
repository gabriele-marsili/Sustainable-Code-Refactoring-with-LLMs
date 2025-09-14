package triangle

import "math"

/*KindFromSides determines the type of triangle formed by sides a, b and c
the triangle is invaid if the longest side is equal or longer than the shorter sides
or any of the sides are invalid (0 or less, NaN or Inf+)*/
func KindFromSides(a, b, c float64) Kind {
	// Early validation checks to avoid unnecessary sorting
	if math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) ||
		a <= 0 || b <= 0 || c <= 0 ||
		math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return NaT
	}

	// Manual sorting without allocation
	var min, mid, max float64
	if a <= b && a <= c {
		min = a
		if b <= c {
			mid, max = b, c
		} else {
			mid, max = c, b
		}
	} else if b <= a && b <= c {
		min = b
		if a <= c {
			mid, max = a, c
		} else {
			mid, max = c, a
		}
	} else {
		min = c
		if a <= b {
			mid, max = a, b
		} else {
			mid, max = b, a
		}
	}

	// Triangle inequality check
	if min+mid <= max {
		return NaT
	}

	// Check triangle type
	if min == mid && mid == max {
		return Equ
	}
	if min == mid || mid == max {
		return Iso
	}
	return Sca
}

// Kind is an enumerated type for triangle kinds
type Kind int

// Types of triangles (an enumareted list)
const (
	Equ Kind = iota // equilateral
	Iso             // isosceles
	Sca             // scalene
	NaT             // not a triangle
)