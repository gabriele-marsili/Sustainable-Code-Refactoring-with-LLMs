package complexnumbers

import "math"

type Number struct {
	a, b float64
}

func (n Number) Real() float64 {
	return n.a
}

func (n Number) Imaginary() float64 {
	return n.b
}

func (n1 Number) Add(n2 Number) Number {
	return Number{n1.a + n2.a, n1.b + n2.b}
}

func (n1 Number) Subtract(n2 Number) Number {
	return Number{n1.a - n2.a, n1.b - n2.b}
}

func (n1 Number) Multiply(n2 Number) Number {
	return Number{
		(n1.a * n2.a) - (n1.b * n2.b),
		(n1.b * n2.a) + (n1.a * n2.b),
	}
}

func (n Number) Times(factor float64) Number {
	return Number{n.a * factor, n.b * factor}
}

func (n1 Number) Divide(n2 Number) Number {
	denom := n2.a*n2.a + n2.b*n2.b
	return Number{
		((n1.a * n2.a) + (n1.b * n2.b)) / denom,
		((n1.b * n2.a) - (n1.a * n2.b)) / denom,
	}
}

func (n Number) Conjugate() Number {
	return Number{n.a, -n.b}
}

func (n Number) Abs() float64 {
	return math.Hypot(n.a, n.b)
}

func (n Number) Exp() Number {
	expA := math.Exp(n.a)
	return Number{
		expA * math.Cos(n.b),
		expA * math.Sin(n.b),
	}
}