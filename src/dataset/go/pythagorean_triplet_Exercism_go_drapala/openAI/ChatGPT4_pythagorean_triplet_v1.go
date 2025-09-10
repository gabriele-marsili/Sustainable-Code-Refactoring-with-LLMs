package pythagorean

type Triplet [3]int

// Given 2 sides, returns the third side of the pythagorean triplet
func isPythagorean(a, b, c int) bool {
	return a*a+b*b == c*c
}

// Range returns a list of all Pythagorean triplets with sides in the
// range min to max inclusive.
func Range(min, max int) []Triplet {
	var TripletArray []Triplet
	for a := min; a <= max; a++ {
		for b := a + 1; b <= max; b++ {
			c := a*a + b*b
			cSqrt := intSqrt(c)
			if cSqrt != -1 && cSqrt <= max {
				TripletArray = append(TripletArray, Triplet{a, b, cSqrt})
			}
		}
	}
	return TripletArray
}

// Sum returns a list of all Pythagorean triplets where the sum a+b+c
// (the perimeter) is equal to p.
// The three elements of each returned triplet must be in order,
// t[0] <= t[1] <= t[2], and the list of triplets must be in lexicographic
// order.
func Sum(p int) []Triplet {
	var TripletArray []Triplet
	for a := 1; a < p/3; a++ {
		for b := a + 1; b < (p-a)/2; b++ {
			c := p - a - b
			if isPythagorean(a, b, c) {
				TripletArray = append(TripletArray, Triplet{a, b, c})
			}
		}
	}
	return TripletArray
}

// Helper function to calculate integer square root, returns -1 if not a perfect square
func intSqrt(n int) int {
	lo, hi := 0, n
	for lo <= hi {
		mid := (lo + hi) / 2
		midSq := mid * mid
		if midSq == n {
			return mid
		} else if midSq < n {
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return -1
}