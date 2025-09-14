package darts

func Score(x, y float64) int {
	// Use squared radius to avoid expensive sqrt operation
	r2 := x*x + y*y

	switch {
	case r2 <= 1.0:
		// Inner circle (r <= 1)
		return 10
	case r2 <= 25.0:
		// Middle circle (r <= 5)
		return 5
	case r2 <= 100.0:
		// Outer circle (r <= 10)
		return 1
	default:
		// Missed target
		return 0
	}
}