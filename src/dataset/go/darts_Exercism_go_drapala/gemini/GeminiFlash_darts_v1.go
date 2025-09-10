package darts

import "math"

func Score(x, y float64) int {
	r2 := x*x + y*y

	switch {
	case r2 <= 1.0:
		return 10
	case r2 <= 25.0:
		return 5
	case r2 <= 100.0:
		return 1
	default:
		return 0
	}
}