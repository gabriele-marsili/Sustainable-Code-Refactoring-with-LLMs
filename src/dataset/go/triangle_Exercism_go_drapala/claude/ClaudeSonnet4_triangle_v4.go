package triangle

type Kind string

const (
	NaT Kind = "NaT"
	Equ Kind = "Equ"
	Iso Kind = "Iso"
	Sca Kind = "Sca"
)

func KindFromSides(a, b, c float64) Kind {
	if a <= 0 || b <= 0 || c <= 0 || (a+b <= c) || (a+c <= b) || (b+c <= a) {
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