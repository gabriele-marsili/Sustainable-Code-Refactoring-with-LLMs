package pythagorean

import (
	"math"
)

type Triplet [3]int

func isNatural(a float64) bool {
	return a == math.Trunc(a)
}

func calculateHypotenuse(a, b int) int {
	return int(math.Sqrt(float64(a*a + b*b)))
}

func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max; a++ {
		for b := a + 1; b <= max; b++ {
			c := calculateHypotenuse(a, b)
			if c <= max && a*a+b*b == c*c {
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
			if a*a+b*b == c*c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}