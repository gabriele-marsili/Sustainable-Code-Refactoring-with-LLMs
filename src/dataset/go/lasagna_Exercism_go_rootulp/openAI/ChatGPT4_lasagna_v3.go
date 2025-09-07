package lasagna

const minutesPerLayer = 2
const ovenTime = 40

func OvenTime() int {
	return ovenTime
}

func RemainingOvenTime(timeInOven int) int {
	return ovenTime - timeInOven
}

func PreparationTime(layers int) int {
	return layers * minutesPerLayer
}

func ElapsedTime(layers int, timeInOven int) int {
	return (layers * minutesPerLayer) + timeInOven
}