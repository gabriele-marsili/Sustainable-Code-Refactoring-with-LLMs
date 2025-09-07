package lasagna

const OvenTime = 40

func RemainingOvenTime(t int) int {
    return OvenTime - t
}

func PreparationTime(numberOfLayers int) int {
    return numberOfLayers << 1
}

func ElapsedTime(numberOfLayers, actualMinutesInOven int) int {
    return (numberOfLayers << 1) + actualMinutesInOven
}