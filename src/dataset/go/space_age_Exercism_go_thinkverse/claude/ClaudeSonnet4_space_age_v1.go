package space

type Planet string

// Age returns your age on a planet.
//
// Benchmark  35714338  ~31 ns/op
func Age(seconds float64, planet Planet) float64 {
	switch planet {
	case "Earth":
		return seconds / 31556700
	case "Mercury":
		return seconds / 7600543.82
	case "Venus":
		return seconds / 19414166.677
	case "Mars":
		return seconds / 59354294.494
	case "Jupiter":
		return seconds / 374355659.124
	case "Saturn":
		return seconds / 929292362.884
	case "Uranus":
		return seconds / 2651370019.3668
	case "Neptune":
		return seconds / 5200418560.032044
	default:
		return -1.0
	}
}