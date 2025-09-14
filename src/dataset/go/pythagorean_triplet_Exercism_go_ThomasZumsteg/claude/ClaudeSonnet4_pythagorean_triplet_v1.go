package pythagorean

//Triplet is a pythagoreant triplet
type Triplet [3]int

/*Range computes all pythagorean triplets with sides of a certain length*/
func Range(min, max int) []Triplet {
	var triplets []Triplet
	
	for a := min; a <= max; a++ {
		aSquared := a * a
		for b := a; b <= max; b++ {
			bSquared := b * b
			cSquared := aSquared + bSquared
			c := intSqrt(cSquared)
			
			if c > max {
				break
			}
			if c >= b && c*c == cSquared {
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
		aSquared := a * a
		for b := a; b <= (p-a)/2; b++ {
			c := p - a - b
			if c < b {
				break
			}
			if aSquared+b*b == c*c {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	return triplets
}

/*iteration gernerates all unique combinations of three numbers in a range*/
func iterator(min, max int) <-chan Triplet {
	ch := make(chan Triplet, 100)
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
	return t[0]*t[0]+t[1]*t[1] == t[2]*t[2]
}

func intSqrt(n int) int {
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