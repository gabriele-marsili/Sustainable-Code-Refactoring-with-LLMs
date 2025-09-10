package pythagorean

type Triplet [3]int

// Range returns a list of all Pythagorean triplets with sides in the
// range min to max inclusive.
func Range(min, max int) (result []Triplet) {
	for a := min; a <= max-2; a++ {
		for b := a + 1; b <= max-1; b++ {
			cSq := a*a + b*b
			c := intSqrt(cSq)
			if c > 0 && c*c == cSq && c <= max {
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
	for a := 1; a < p/3; a++ {
		for b := a + 1; b < (p-a)/2; b++ {
			c := p - a - b
			if a*a+b*b == c*c {
				result = append(result, Triplet{a, b, c})
			}
		}
	}
	return result
}

// intSqrt calculates the integer square root of a number.
// Returns 0 if the number is not a perfect square.
func intSqrt(n int) int {
	if n < 0 {
		return 0
	}
	x := n
	y := (x + 1) / 2
	for y < x {
		x = y
		y = (x + n/x) / 2
	}
	if x*x == n {
		return x
	}
	return 0
}