package triangle

// Notice KindFromSides() returns this type. Pick a suitable data type.
type Kind string

const (
	// Pick values for the following identifiers used by the test program.
	NaT Kind = "NaT" // not a triangle
	Equ Kind = "Equ" // equilateral
	Iso Kind = "Iso" // isosceles
	Sca Kind = "Sca" // scalene
)

func KindFromSides(a, b, c float64) Kind {
	// Check if any side is non-positive or NaN
	if a <= 0 || b <= 0 || c <= 0 || isNaN(a) || isNaN(b) || isNaN(c) {
		return NaT
	}

	// Check triangle inequality
	if a+b < c || a+c < b || b+c < a {
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

func isNaN(f float64) bool {
	return f != f
}