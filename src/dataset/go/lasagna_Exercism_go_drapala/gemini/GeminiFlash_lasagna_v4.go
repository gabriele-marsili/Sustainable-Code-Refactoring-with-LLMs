package lasagna

// OvenTime is the expected oven time in minutes.
const OvenTime = 40

// RemainingOvenTime returns the remaining oven time in minutes.
func RemainingOvenTime(actualMinutesInOven int) int {
	return OvenTime - actualMinutesInOven
}

// PreparationTime calculates the preparation time in minutes based on the number of layers.
func PreparationTime(numberOfLayers int) int {
	return numberOfLayers * 2
}

// ElapsedTime calculates the total elapsed time in minutes.
func ElapsedTime(numberOfLayers, actualMinutesInOven int) int {
	return numberOfLayers*2 + actualMinutesInOven
}