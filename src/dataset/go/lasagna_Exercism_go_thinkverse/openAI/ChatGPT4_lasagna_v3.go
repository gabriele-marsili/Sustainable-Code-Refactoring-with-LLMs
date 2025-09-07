package lasagna

const OvenTime = 40

func RemainingOvenTime(actualMinutesInOven int) int {
	if actualMinutesInOven >= OvenTime {
		return 0
	}
	return OvenTime - actualMinutesInOven
}

func PreparationTime(numberOfLayers int) int {
	return numberOfLayers << 1 // Multiply by 2 using bitwise shift for efficiency
}

func ElapsedTime(numberOfLayers, actualMinutesInOven int) int {
	return actualMinutesInOven + (numberOfLayers << 1)
}