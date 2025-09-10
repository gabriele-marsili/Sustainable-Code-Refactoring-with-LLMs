package space

type Planet string

const secondsInEarthYear = 31556700.0

var planetYears = map[Planet]float64{
	"Mercury": 0.2408467,
	"Venus":   0.61519726,
	"Mars":    1.8808158,
	"Jupiter": 11.862615,
	"Saturn":  29.447498,
	"Uranus":  84.016846,
	"Neptune": 164.79132,
}

// Age returns your age on a planet.
//
// Benchmark  >35714338  <31 ns/op
func Age(seconds float64, planet Planet) float64 {
	if planet == "Earth" {
		return seconds / secondsInEarthYear
	}

	yearFactor, ok := planetYears[planet]
	if !ok {
		return -1.0
	}

	return seconds / (secondsInEarthYear * yearFactor)
}