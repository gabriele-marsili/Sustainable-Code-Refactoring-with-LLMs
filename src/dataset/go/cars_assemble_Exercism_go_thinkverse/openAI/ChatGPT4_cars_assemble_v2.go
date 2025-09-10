package cars

// CalculateWorkingCarsPerHour calculates how many working cars are
// produced by the assembly line every hour
func CalculateWorkingCarsPerHour(productionRate int, successRate float64) float64 {
	return float64(productionRate) * (successRate / 100)
}

// CalculateWorkingCarsPerMinute calculates how many working cars are
// produced by the assembly line every minute
func CalculateWorkingCarsPerMinute(productionRate int, successRate float64) int {
	return (productionRate * int(successRate)) / 6000
}

// CalculateCost works out the cost of producing the given number of cars
func CalculateCost(carsCount int) uint {
	bulk := carsCount / 10
	remainder := carsCount % 10
	return uint(bulk*95_000 + remainder*10_000)
}