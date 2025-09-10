package cars

const carsProducedPerHourAtSpeedOne = 221

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

func CalculateProductionRatePerMinute(speed int) int {
	return int(CalculateProductionRatePerHour(speed) / 60)
}