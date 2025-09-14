package triangle

// Notice KindFromSides() returns this type. Pick a suitable data type.
type Kind uint8

const (
	// Pick values for the following identifiers used by the test program.
	NaT Kind = iota // not a triangle
	Equ             // equilateral
	Iso             // isosceles
	Sca             // scalene
)

func KindFromSides(a, b, c float64) Kind {
	// Check if Triangle
	if a <= 0 || b <= 0 || c <= 0 || (a+b <= c) || (a+c <= b) || (b+c <= a) {
		return NaT
	}

	// Count equal sides
	equalCount := 0
	if a == b {
		equalCount++
	}
	if b == c {
		equalCount++
	}
	if a == c {
		equalCount++
	}

	switch equalCount {
	case 3:
		return Equ
	case 1:
		return Iso
	default:
		return Sca
	}
}