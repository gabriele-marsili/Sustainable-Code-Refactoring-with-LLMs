package pythagorean

type Triplet [3]int

func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max; a++ {
		for b := a; b <= max; b++ {
			c2 := a*a + b*b
			c := intSqrt(c2)
			if c >= b && c <= max && c*c == c2 {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

func Sum(p int) []Triplet {
	var triplets []Triplet
	for a := 1; a <= p/3; a++ {
		for b := a; b <= (p-a)/2; b++ {
			c := p - a - b
			if a*a+b*b == c*c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

func isTriplet(t Triplet) bool {
	return t[0]*t[0]+t[1]*t[1] == t[2]*t[2]
}

func intSqrt(n int) int {
	x := n
	y := (x + 1) / 2
	for y < x {
		x = y
		y = (x + n/x) / 2
	}
	return x
}