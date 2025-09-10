package darts

import "math"

const (
	innerRadiusSq  = 1.0
	middleRadiusSq = 25.0
	outerRadiusSq  = 100.0
)

func Score(x, y float64) int {
	distanceSq := x*x + y*y

	if distanceSq <= innerRadiusSq {
		return 10
	} else if distanceSq <= middleRadiusSq {
		return 5
	} else if distanceSq <= outerRadiusSq {
		return 1
	}
	return 0
}