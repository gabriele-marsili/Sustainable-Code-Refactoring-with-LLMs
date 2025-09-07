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
	a1, b1 := n1.a, n1.b
	a2, b2 := n2.a, n2.b
	return Number{
		a: (a1 * a2) - (b1 * b2),
		b: (b1 * a2) + (a1 * b2),
	}
}

func (n Number) Times(factor float64) Number {
	return Number{
		a: n.a * factor,
		b: n.b * factor,
	}
}

func (n1 Number) Divide(n2 Number) Number {
	a1, b1 := n1.a, n1.b
	a2, b2 := n2.a, n2.b
	denominator := a2*a2 + b2*b2
	return Number{
		a: ((a1*a2 + b1*b2) / denominator),
		b: ((b1*a2 - a1*b2) / denominator),
	}
}

func (n Number) Conjugate() Number {
	return Number{
		a: n.a,
		b: -n.b,
	}
}

func (n Number) Abs() float64 {
	a, b := n.a, n.b
	return math.Sqrt(a*a + b*b)
}

func (n Number) Exp() Number {
	expA := math.Exp(n.a)
	return Number{
		a: expA * math.Cos(n.b),
		b: expA * math.Sin(n.b),
	}
}