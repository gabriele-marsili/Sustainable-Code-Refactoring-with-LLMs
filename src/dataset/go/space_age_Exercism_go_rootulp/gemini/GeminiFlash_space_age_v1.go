package space

// Planet names
type Planet string

const secondsInEarthYear = 31557600.0

// orbitalPeriods stores the orbital periods as a slice, indexed by planet.
var orbitalPeriods = []float64{0, 0.2408467, 0.61519726, 1, 1.8808158, 11.862615, 29.447498, 84.016846, 164.79132}

// planetIndex maps planet names to their index in the orbitalPeriods slice.
var planetIndex = map[Planet]int{
	"Mercury": 1,
	"Venus":   2,
	"Earth":   3,
	"Mars":    4,
	"Jupiter": 5,
	"Saturn":  6,
	"Uranus":  7,
	"Neptune": 8,
}

// Age returns the age in years of someone on planet given their age in seconds.
func Age(ageInSeconds float64, planet Planet) float64 {
	return ageInSeconds / secondsInEarthYear / orbitalPeriods[planetIndex[planet]]
}