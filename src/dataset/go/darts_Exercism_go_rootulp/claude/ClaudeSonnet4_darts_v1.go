package darts

const innerRadius = 1
const middleRadius = 5
const outerRadius = 10

const innerRadiusSquared = innerRadius * innerRadius
const middleRadiusSquared = middleRadius * middleRadius
const outerRadiusSquared = outerRadius * outerRadius

func Score(x, y float64) int {
	distanceSquared := x*x + y*y
	
	if distanceSquared <= innerRadiusSquared {
		return 10
	} else if distanceSquared <= middleRadiusSquared {
		return 5
	} else if distanceSquared <= outerRadiusSquared {
		return 1
	}
	return 0
}

func isInCircle(x float64, y float64, radius int) bool {
	radiusSquared := float64(radius * radius)
	return x*x + y*y <= radiusSquared
}

func distanceToCenter(x float64, y float64) float64 {
	return x*x + y*y
}