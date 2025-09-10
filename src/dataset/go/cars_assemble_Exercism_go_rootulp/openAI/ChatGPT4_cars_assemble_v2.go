package cars

const carsProducedPerHourAtSpeedOne = 221

// CalculateProductionRatePerHour for the assembly line, taking into account
// its success rate
func CalculateProductionRatePerHour(speed int) float64 {
	return float64(speed * carsProducedPerHourAtSpeedOne) * successRate(speed)
}

// CalculateProductionRatePerMinute describes how many working items are
// produced by the assembly line every minute
func CalculateProductionRatePerMinute(speed int) int {
	return int(float64(speed*carsProducedPerHourAtSpeedOne) * successRate(speed) / 60)
}

// successRate is used to calculate the ratio of an item being created without
// error for a given speed
func successRate(speed int) float64 {
	switch {
	case speed == 0:
		return 0.0
	case speed < 5:
		return 1.0
	case speed >= 9:
		return 0.77
	default:
		return 0.9
	}
}