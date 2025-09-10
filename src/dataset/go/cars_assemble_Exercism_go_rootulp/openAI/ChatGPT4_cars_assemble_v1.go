package cars

const carsProducedPerHourAtSpeedOne = 221

// CalculateProductionRatePerHour for the assembly line, taking into account
// its success rate
func CalculateProductionRatePerHour(speed int) float64 {
	switch {
	case speed == 0:
		return 0.0
	case speed < 5:
		return float64(carsProducedPerHourAtSpeedOne * speed)
	case speed >= 9:
		return float64(carsProducedPerHourAtSpeedOne*speed) * 0.77
	default:
		return float64(carsProducedPerHourAtSpeedOne*speed) * 0.9
	}
}

// CalculateProductionRatePerMinute describes how many working items are
// produced by the assembly line every minute
func CalculateProductionRatePerMinute(speed int) int {
	return int(CalculateProductionRatePerHour(speed) / 60)
}