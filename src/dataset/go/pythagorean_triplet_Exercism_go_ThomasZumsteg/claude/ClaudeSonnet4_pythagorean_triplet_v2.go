package pythagorean

//Triplet is a pythagoreant triplet
type Triplet [3]int

/*Range computes all pythagorean triplets with sides of a certain length*/
func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max; a++ {
		for b := a; b <= max; b++ {
			aa := a * a
			bb := b * b
			cc := aa + bb
			c := isqrt(cc)
			if c*c == cc && c >= b && c <= max {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

/*Sum computes all pythagorean triplets where the sides sum to some value*/
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

/*isqrt computes integer square root*/
func isqrt(n int) int {
	if n < 2 {
		return n
	}
	x := n
	y := (x + 1) / 2
	for y < x {
		x = y
		y = (x + n/x) / 2
	}
	return x
}