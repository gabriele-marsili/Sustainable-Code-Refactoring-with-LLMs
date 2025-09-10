package space

// Planet names
type Planet string

const secondsInEarthYear = 31557600

// Precomputed reciprocal of orbital periods for performance
var orbitalPeriodsReciprocal = map[Planet]float64{
	"Mercury": 1 / 0.2408467,
	"Venus":   1 / 0.61519726,
	"Earth":   1,
	"Mars":    1 / 1.8808158,
	"Jupiter": 1 / 11.862615,
	"Saturn":  1 / 29.447498,
	"Uranus":  1 / 84.016846,
	"Neptune": 1 / 164.79132,
}

// Age returns the age in years of someone on planet given their age in seconds.
func Age(ageInSeconds float64, planet Planet) float64 {
	return (ageInSeconds / secondsInEarthYear) * orbitalPeriodsReciprocal[planet]
}

// AgeOnEarth returns the age of someone on Earth given their age in seconds.
func ageOnEarth(ageInSeconds float64) float64 {
	return ageInSeconds / secondsInEarthYear
}