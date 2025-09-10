package darts

import "math"

func Score(x, y float64) int {
	rSquared := x*x + y*y

	switch {
	case rSquared <= 1.0:
		return 10
	case rSquared <= 25.0:
		return 5
	case rSquared <= 100.0:
		return 1
	default:
		return 0
	}
}