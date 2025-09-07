package lasagna

const MINUTES_PER_LAYER = 2
const OVEN_TIME = 40

func OvenTime() int {
	return OVEN_TIME
}

func RemainingOvenTime(timeInOven int) int {
	remaining := OVEN_TIME - timeInOven
	if remaining < 0 {
		return 0
	}
	return remaining
}

func PreparationTime(layers int) int {
	return layers * MINUTES_PER_LAYER
}

func ElapsedTime(layers int, timeInOven int) int {
	return PreparationTime(layers) + timeInOven
}