package lasagna

const (
	MINUTES_PER_LAYER = 2
	OVEN_TIME         = 40
)

func OvenTime() int {
	return OVEN_TIME
}

func RemainingOvenTime(timeInOven int) int {
	return OVEN_TIME - timeInOven
}

func PreparationTime(layers int) int {
	return layers << 1
}

func ElapsedTime(layers int, timeInOven int) int {
	return (layers << 1) + timeInOven
}