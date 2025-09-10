package space

// Planet names
type Planet string

const secondsInEarthYear = 31557600

var orbitalPeriods = map[Planet]float64{
	"Mercury": 0.2408467,
	"Venus":   0.61519726,
	"Earth":   1,
	"Mars":    1.8808158,
	"Jupiter": 11.862615,
	"Saturn":  29.447498,
	"Uranus":  84.016846,
	"Neptune": 164.79132,
}

// Age returns the age in years of someone on planet given their age in seconds.
func Age(ageInSeconds float64, planet Planet) float64 {
	if period, exists := orbitalPeriods[planet]; exists {
		return ageInSeconds / (secondsInEarthYear * period)
	}
	return 0
}