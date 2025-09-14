package pythagorean

type Triplet [3]int

func checkNatural(a float64) bool {
	return a == float64(int64(a))
}

func returnPythagoran(a, b int) float64 {
	c_squared := a*a + b*b
	c := int(c_squared)
	for i := 1; i*i <= c_squared; i++ {
		if i*i == c_squared {
			return float64(i)
		}
	}
	return -1
}

func Range(min, max int) []Triplet {
	var TripletArray []Triplet
	for a := min; a <= max; a++ {
		for b := a + 1; b <= max; b++ {
			c_squared := a*a + b*b
			c := 1
			for c*c < c_squared {
				c++
			}
			if c*c == c_squared && c <= max {
				TripletArray = append(TripletArray, Triplet{a, b, c})
			}
		}
	}
	return TripletArray
}

func Sum(p int) []Triplet {
	var TripletArray []Triplet
	for a := 1; a < p/3; a++ {
		for b := a + 1; b < (p-a)/2; b++ {
			c := p - a - b
			if a*a+b*b == c*c && b < c {
				TripletArray = append(TripletArray, Triplet{a, b, c})
			}
		}
	}
	return TripletArray
}