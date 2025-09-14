package darts

func Score(x, y float64) int {
	// Calculate squared radius to avoid expensive sqrt operation
	rSquared := x*x + y*y

	switch {
	case rSquared <= 1.0:
		// Inner circle (r <= 1)
		return 10
	case rSquared <= 25.0:
		// Middle circle (r <= 5)
		return 5
	case rSquared <= 100.0:
		// Outer circle (r <= 10)
		return 1
	default:
		// Missed target
		return 0
	}
}