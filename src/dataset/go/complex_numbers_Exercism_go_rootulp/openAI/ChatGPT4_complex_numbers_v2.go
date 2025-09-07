package complexnumbers

import "math"

// Define the Number type here.
type Number struct {
	a float64
	b float64
}

func (n Number) Real() float64 {
	return n.a
}

func (n Number) Imaginary() float64 {
	return n.b
}

func (n1 Number) Add(n2 Number) Number {
	return Number{
		a: n1.a + n2.a,
		b: n1.b + n2.b,
	}
}

func (n1 Number) Subtract(n2 Number) Number {
	return Number{
		a: n1.a - n2.a,
		b: n1.b - n2.b,
	}
}

func (n1 Number) Multiply(n2 Number) Number {
	return Number{
		a: n1.a*n2.a - n1.b*n2.b,
		b: n1.b*n2.a + n1.a*n2.b,
	}
}

func (n Number) Times(factor float64) Number {
	return Number{
		a: n.a * factor,
		b: n.b * factor,
	}
}

func (n1 Number) Divide(n2 Number) Number {
	denom := n2.a*n2.a + n2.b*n2.b
	return Number{
		a: (n1.a*n2.a + n1.b*n2.b) / denom,
		b: (n1.b*n2.a - n1.a*n2.b) / denom,
	}
}

func (n Number) Conjugate() Number {
	n.b = -n.b
	return n
}

func (n Number) Abs() float64 {
	return math.Hypot(n.a, n.b)
}

func (n Number) Exp() Number {
	expA := math.Exp(n.a)
	return Number{
		a: expA * math.Cos(n.b),
		b: expA * math.Sin(n.b),
	}
}