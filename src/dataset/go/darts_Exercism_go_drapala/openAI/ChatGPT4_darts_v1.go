package darts

func Score(x, y float64) int {
	r2 := x*x + y*y // Calculate squared radius to avoid expensive sqrt operation

	switch {
	case r2 <= 1.0:
		return 10 // Inner circle
	case r2 <= 25.0:
		return 5 // Middle circle
	case r2 <= 100.0:
		return 1 // Outer circle
	default:
		return 0 // Missed target
	}
}