package pythagorean

import (
	"math"
)

type Triplet [3]int

func checkNatural(a float64) bool {
	return a == math.Trunc(a)
}

func returnPythagoran(a, b int) int {
	return int(math.Sqrt(float64(a*a + b*b)))
}

func Range(min, max int) []Triplet {
	var TripletArray []Triplet
	for a := min; a <= max; a++ {
		for b := a + 1; b <= max; b++ {
			c := a*a + b*b
			cSqrt := int(math.Sqrt(float64(c)))
			if cSqrt*cSqrt == c && cSqrt <= max {
				TripletArray = append(TripletArray, Triplet{a, b, cSqrt})
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
			if a*a+b*b == c*c {
				TripletArray = append(TripletArray, Triplet{a, b, c})
			}
		}
	}
	return TripletArray
}