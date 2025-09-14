package darts

func Score(x, y float64) int {
	r2 := x*x + y*y

	if r2 <= 1.0 {
		return 10
	}
	if r2 <= 25.0 {
		return 5
	}
	if r2 <= 100.0 {
		return 1
	}
	return 0
}