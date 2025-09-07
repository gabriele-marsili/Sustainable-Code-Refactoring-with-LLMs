package lasagna

const (
	OvenTime           = 40
	PreparationPerLayer = 2
)

func RemainingOvenTime(actualMinutesInOven int) int {
	return OvenTime - actualMinutesInOven
}

func PreparationTime(numberOfLayers int) int {
	return numberOfLayers * PreparationPerLayer
}

func ElapsedTime(numberOfLayers, actualMinutesInOven int) int {
	return actualMinutesInOven + numberOfLayers*PreparationPerLayer
}