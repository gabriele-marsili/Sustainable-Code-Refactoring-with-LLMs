package cars

func CalculateWorkingCarsPerHour(productionRate int, successRate float64) float64 {
	return float64(productionRate) * (successRate / 100)
}

func CalculateWorkingCarsPerMinute(productionRate int, successRate float64) int {
	return int(float64(productionRate) * (successRate / 100) / 60)
}

func CalculateCost(carsCount int) uint {
	bulk := carsCount / 10
	individual := carsCount % 10
	return uint(bulk)*95_000 + uint(individual)*10_000
}