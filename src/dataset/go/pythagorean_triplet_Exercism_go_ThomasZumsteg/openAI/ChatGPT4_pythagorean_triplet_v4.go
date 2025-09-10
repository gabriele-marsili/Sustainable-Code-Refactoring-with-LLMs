package pythagorean

type Triplet [3]int

func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max-2; a++ {
		for b := a + 1; b <= max-1; b++ {
			c := b + 1
			for c*c < a*a+b*b && c <= max {
				c++
			}
			if c <= max && a*a+b*b == c*c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

func Sum(p int) []Triplet {
	var triplets []Triplet
	for a := 1; a <= p/3; a++ {
		for b := a + 1; b < (p-a)/2; b++ {
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