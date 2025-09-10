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
	tenCarGroups := carsCount / 10
	remainingCars := carsCount % 10
	return uint(tenCarGroups)*95_000 + uint(remainingCars)*10_000
}