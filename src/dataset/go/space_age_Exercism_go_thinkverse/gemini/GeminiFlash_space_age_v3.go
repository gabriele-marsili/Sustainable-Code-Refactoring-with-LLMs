package space

type Planet string

var planetOrbitalPeriods = map[Planet]float64{
	"Earth":   1.0,
	"Mercury": 0.2408467,
	"Venus":   0.61519726,
	"Mars":    1.8808158,
	"Jupiter": 11.862615,
	"Saturn":  29.447498,
	"Uranus":  84.016846,
	"Neptune": 164.79132,
}

const earthYearInSeconds = 31556700.0

// Age returns your age on a planet.
//
// Benchmark  >30000000  <35 ns/op
func Age(seconds float64, planet Planet) float64 {
	orbitalPeriod, ok := planetOrbitalPeriods[planet]
	if !ok {
		return -1.0
	}
	return seconds / (earthYearInSeconds * orbitalPeriod)
}