package pythagorean

type Triplet [3]int

func Range(min, max int) []Triplet {
	var triplets []Triplet
	
	for a := min; a <= max; a++ {
		aSquared := a * a
		for b := a; b <= max; b++ {
			bSquared := b * b
			cSquared := aSquared + bSquared
			c := isqrt(cSquared)
			
			if c > max || c < b {
				continue
			}
			
			if c*c == cSquared {
				triplets = append(triplets, Triplet{a, b, c})
			}
		}
	}
	
	return triplets
}

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

func isTriplet(t Triplet) bool {
	return t[0]*t[0]+t[1]*t[1] == t[2]*t[2]
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