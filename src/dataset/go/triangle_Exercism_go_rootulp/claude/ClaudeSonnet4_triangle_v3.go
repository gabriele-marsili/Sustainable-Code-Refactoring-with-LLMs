package triangle

import "math"

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
		return ""
	}
}

func KindFromSides(a, b, c float64) Kind {
	if a <= 0 || b <= 0 || c <= 0 || 
		math.IsNaN(a) || math.IsNaN(b) || math.IsNaN(c) ||
		math.IsInf(a, 1) || math.IsInf(b, 1) || math.IsInf(c, 1) {
		return NaT
	}
	
	if a+b <= c || a+c <= b || b+c <= a {
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

func isTriangle(a, b, c float64) bool {
	return KindFromSides(a, b, c) != NaT
}

func isSumOfTwoSidesGreaterThanThirdSide(x, y, z float64) bool {
	return x+y >= z
}

func isValidSideLength(x float64) bool {
	return x > 0 && !math.IsNaN(x) && !math.IsInf(x, 1)
}