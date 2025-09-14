package pythagorean

type Triplet [3]int

// Range returns a list of all Pythagorean triplets with sides in the
// range min to max inclusive.
func Range(min, max int) (result []Triplet) {
	if min > max-2 {
		return result
	}
	
	for a := min; a <= max-2; a++ {
		a2 := a * a
		for b := a + 1; b <= max-1; b++ {
			c2 := a2 + b*b
			c := isqrt(c2)
			if c*c == c2 && c <= max && b < c {
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
	if p < 3 {
		return result
	}
	
	for a := 1; a < p/3; a++ {
		a2 := a * a
		for b := a + 1; b < (p-a)/2; b++ {
			c := p - a - b
			if b < c && a2+b*b == c*c {
				result = append(result, Triplet{a, b, c})
			}
		}
	}
	return result
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