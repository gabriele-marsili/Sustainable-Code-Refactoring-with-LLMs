package pythagorean

//Triplet is a pythagoreant triplet
type Triplet [3]int

/*Range computes all pythagorean triplets with sides of a certain length*/
func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max; a++ {
		for b := a + 1; b <= max; b++ {
			cSquared := a*a + b*b
			c := 0
			for i := b + 1; i <= max; i++ {
				if i*i == cSquared {
					c = i
					break
				} else if i*i > cSquared {
					break
				}
			}
			if c != 0 {
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
		for b := a + 1; b <= (p-a)/2; b++ {
			c := p - a - b
			if b >= c {
				continue
			}
			if a*a+b*b == c*c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}