package darts

const (
	innerRadiusSquared  = 1 * 1
	middleRadiusSquared = 5 * 5
	outerRadiusSquared  = 10 * 10
)

func Score(x, y float64) int {
	distanceSquared := x*x + y*y
	switch {
	case distanceSquared <= innerRadiusSquared:
		return 10
	case distanceSquared <= middleRadiusSquared:
		return 5
	case distanceSquared <= outerRadiusSquared:
		return 1
	default:
		return 0
	}
}