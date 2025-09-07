package lasagna

const minutesPerLayer = 2
const ovenTime = 40

func RemainingOvenTime(timeInOven int) int {
	return ovenTime - timeInOven
}

func PreparationTime(layers int) int {
	return layers * minutesPerLayer
}

func ElapsedTime(layers, timeInOven int) int {
	return (layers * minutesPerLayer) + timeInOven
}