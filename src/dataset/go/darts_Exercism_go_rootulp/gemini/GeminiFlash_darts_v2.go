package darts

import "math"

const innerRadius = 1
const middleRadius = 5
const outerRadius = 10

func Score(x, y float64) int {
	distanceSquared := x*x + y*y

	if distanceSquared <= float64(innerRadius*innerRadius) {
		return 10
	} else if distanceSquared <= float64(middleRadius*middleRadius) {
		return 5
	} else if distanceSquared <= float64(outerRadius*outerRadius) {
		return 1
	}
	return 0
}