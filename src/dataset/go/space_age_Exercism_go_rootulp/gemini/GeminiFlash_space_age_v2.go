package space

// Planet names
type Planet string

const secondsInEarthYear = 31557600.0

// Orbital periods pre-calculated for efficiency.  Using float32 to reduce memory footprint where precision loss is acceptable.
var orbitalPeriods = map[Planet]float32{
	"Mercury": 0.2408467,
	"Venus":   0.61519726,
	"Earth":   1.0,
	"Mars":    1.8808158,
	"Jupiter": 11.862615,
	"Saturn":  29.447498,
	"Uranus":  84.016846,
	"Neptune": 164.79132,
}

// Age returns the age in years of someone on planet given their age in seconds.
func Age(ageInSeconds float64, planet Planet) float64 {
	return ageInSeconds / (secondsInEarthYear * float64(orbitalPeriods[planet]))
}