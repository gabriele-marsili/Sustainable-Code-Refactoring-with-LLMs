package cars

const CARS_PRODUCED_PER_HOUR_AT_SPEED_ONE = 221

var successRateCache = [11]float64{
	0.0,  // speed 0
	1.0,  // speed 1
	1.0,  // speed 2
	1.0,  // speed 3
	1.0,  // speed 4
	0.9,  // speed 5
	0.9,  // speed 6
	0.9,  // speed 7
	0.9,  // speed 8
	0.77, // speed 9
	0.77, // speed 10
}

func CalculateProductionRatePerHour(speed int) float64 {
	if speed <= 0 {
		return 0.0
	}
	if speed > 10 {
		speed = 10
	}
	return float64(CARS_PRODUCED_PER_HOUR_AT_SPEED_ONE*speed) * successRateCache[speed]
}

func CalculateProductionRatePerMinute(speed int) int {
	if speed <= 0 {
		return 0
	}
	if speed > 10 {
		speed = 10
	}
	return (CARS_PRODUCED_PER_HOUR_AT_SPEED_ONE * speed * int(successRateCache[speed]*100)) / 6000
}

func successRate(speed int) float64 {
	if speed <= 0 {
		return 0.0
	}
	if speed > 10 {
		return 0.77
	}
	return successRateCache[speed]
}