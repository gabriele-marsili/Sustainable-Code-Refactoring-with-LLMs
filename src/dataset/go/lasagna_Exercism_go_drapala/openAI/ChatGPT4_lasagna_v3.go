package lasagna

const OvenTime = 40

func RemainingOvenTime(t int) int {
    return OvenTime - t
}

func PreparationTime(numberOfLayers int) int {
    return numberOfLayers << 1 // Multiply by 2 using bitwise shift for efficiency
}

func ElapsedTime(numberOfLayers, actualMinutesInOven int) int {
    return (numberOfLayers << 1) + actualMinutesInOven
}