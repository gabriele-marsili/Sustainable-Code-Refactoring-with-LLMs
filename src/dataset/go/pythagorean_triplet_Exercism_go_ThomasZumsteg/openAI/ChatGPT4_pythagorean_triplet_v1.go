package pythagorean

// Triplet is a pythagorean triplet
type Triplet [3]int

/* Range computes all pythagorean triplets with sides of a certain length */
func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max; a++ {
		for b := a; b <= max; b++ {
			c2 := a*a + b*b
			c := intSqrt(c2)
			if c <= max && c*c == c2 {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

/* Sum computes all pythagorean triplets where the sides sum to some value */
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

/* isTriplet determines if three numbers are a triplet */
func isTriplet(t Triplet) bool {
	return t[0]*t[0]+t[1]*t[1] == t[2]*t[2]
}

/* intSqrt computes the integer square root of a number */
func intSqrt(n int) int {
	x := n
	y := (x + 1) / 2
	for y < x {
		x = y
		y = (x + n/x) / 2
	}
	return x
}