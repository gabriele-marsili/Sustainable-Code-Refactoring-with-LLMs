package cars

func SuccessRate(speed int) float64 {
	switch {
	case speed >= 1 && speed <= 4:
		return 1.0
	case speed >= 5 && speed <= 8:
		return 0.9
	case speed >= 9 && speed <= 10:
		return 0.77
	default:
		return 0.0
	}
}

func CalculateProductionRatePerHour(speed int) float64 {
	return float64(speed) * 221 * SuccessRate(speed)
}

func CalculateProductionRatePerMinute(speed int) int {
	return int(CalculateProductionRatePerHour(speed)) / 60
}

func CalculateLimitedProductionRatePerHour(speed int, limit float64) float64 {
	productionRate := CalculateProductionRatePerHour(speed)
	if productionRate > limit {
		return limit
	}
	return productionRate
}