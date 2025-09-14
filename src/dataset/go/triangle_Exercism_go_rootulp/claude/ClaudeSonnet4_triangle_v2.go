package triangle

import "math"

// Notice KindFromSides() returns this type. Pick a suitable data type.
type Kind uint8

const (
	NaT Kind = iota
	Equ
	Iso
	Sca
)

func (k Kind) String() string {
	switch k {
	case NaT:
		return "Not a triangle"
	case Equ:
		return "Equilateral"
	case Iso:
		return "Isosceles"
	case Sca:
		return "Scalene"
	default:
		return "Unknown"
	}
}

func KindFromSides(a, b, c float64) Kind {
	// Early validation checks
	if a <= 0 || b <= 0 || c <= 0 || 
		math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) ||
		math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return NaT
	}
	
	// Triangle inequality check
	if a+b <= c || a+c <= b || b+c <= a {
		return NaT
	}
	
	// Check triangle type
	if a == b && b == c {
		return Equ
	}
	if a == b || a == c || b == c {
		return Iso
	}
	return Sca
}