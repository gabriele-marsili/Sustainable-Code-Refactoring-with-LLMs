package pythagorean

type Triplet [3]int

func Range(min, max int) []Triplet {
	var triplets []Triplet
	
	for a := min; a <= max; a++ {
		for b := a + 1; b <= max; b++ {
			cSquared := a*a + b*b
			c := isqrt(cSquared)
			
			if c*c == cSquared && c <= max {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

func Sum(p int) []Triplet {
	var triplets []Triplet
	
	for a := 1; a < p/3; a++ {
		for b := a + 1; b < (p-a)/2; b++ {
			c := p - a - b
			if a*a+b*b == c*c && b < c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

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