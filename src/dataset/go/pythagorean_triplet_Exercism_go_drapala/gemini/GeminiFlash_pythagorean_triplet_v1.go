package pythagorean

import (
	"math"
)

type Triplet [3]int

// Range returns a list of all Pythagorean triplets with sides in the
// range min to max inclusive.
func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max/3; a++ {
		for b := a + 1; b <= max/2; b++ {
			cSquared := a*a + b*b
			c := int(math.Sqrt(float64(cSquared)))
			if c > max {
				continue
			}
			if c*c == cSquared {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

// Sum returns a list of all Pythagorean triplets where the sum a+b+c
// (the perimeter) is equal to p.
// The three elements of each returned triplet must be in order,
// t[0] <= t[1] <= t[2], and the list of triplets must be in lexicographic
// order.
func Sum(p int) []Triplet {
	var triplets []Triplet
	for a := 1; a <= p/3; a++ {
		for b := a + 1; b <= (p-a)/2; b++ {
			c := p - a - b
			if a*a+b*b == c*c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}