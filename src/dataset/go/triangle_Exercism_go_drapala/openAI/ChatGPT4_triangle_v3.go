package triangle

type Kind string

const (
	NaT Kind = "NaT" // not a triangle
	Equ Kind = "Equ" // equilateral
	Iso Kind = "Iso" // isosceles
	Sca Kind = "Sca" // scalene
)

func KindFromSides(a, b, c float64) Kind {
	if a <= 0 || b <= 0 || c <= 0 || a+b <= c || a+c <= b || b+c <= a {
		return NaT
	}
	switch {
	case a == b && b == c:
		return Equ
	case a == b || a == c || b == c:
		return Iso
	default:
		return Sca
	}
}