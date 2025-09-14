package pythagorean

// Triplet is a pythagorean triplet
type Triplet [3]int

/*Range computes all pythagorean triplets with sides of a certain length*/
func Range(min, max int) []Triplet {
	var triplets []Triplet
	for a := min; a <= max; a++ {
		for b := a + 1; b <= max; b++ {
			cSquared := a*a + b*b
			c := 0
			for i := b; i <= max; i++ {
				if i*i == cSquared {
					c = i
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
			if a*a+b*b == c*c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

/*iteration gernerates all unique combinations of three numbers in a range*/
func iterator(min, max int) <-chan Triplet {
	ch := make(chan Triplet, 100) // Buffered channel
	go func() {
		defer close(ch)
		for a := min; a <= max; a++ {
			for b := a; b <= max; b++ {
				for c := b; c <= max; c++ {
					ch <- Triplet{a, b, c}
				}
			}
		}
	}()
	return ch
}

/*isTriplet determines if three number are a triplet*/
func isTriplet(t Triplet) bool {
	a, b, c := t[0], t[1], t[2]
	return a*a+b*b == c*c && a < b && b < c
}