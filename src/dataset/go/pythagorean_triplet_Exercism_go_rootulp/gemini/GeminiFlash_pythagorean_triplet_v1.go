package pythagorean

import "math"

type Triplet [3]int

// Range returns a list of all Pythagorean triplets with sides in the
// range min to max inclusive.
func Range(min, max int) (result []Triplet) {
	for a := min; a <= max/2; a++ {
		aSq := a * a
		for b := a + 1; b <= max; b++ {
			bSq := b * b
			cSq := aSq + bSq
			c := int(math.Sqrt(float64(cSq)))
			if c > max {
				break
			}
			if c*c == cSq {
				result = append(result, Triplet{a, b, c})
			}
		}
	}
	return result
}

// Sum returns a list of all Pythagorean triplets where the sum a+b+c
// (the perimeter) is equal to p.
// The three elements of each returned triplet must be in order,
// t[0] <= t[1] <= t[2], and the list of triplets must be in lexicographic
// order.
func Sum(p int) (result []Triplet) {
	for a := 1; a <= p/3; a++ {
		for b := a + 1; b <= (p-a)/2; b++ {
			c := p - a - b
			if a*a+b*b == c*c {
				result = append(result, Triplet{a, b, c})
			}
		}
	}
	return result
}