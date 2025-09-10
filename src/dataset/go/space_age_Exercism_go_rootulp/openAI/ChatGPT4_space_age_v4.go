package space

type Planet string

const secondsInEarthYear = 31557600

func Age(ageInSeconds float64, planet Planet) float64 {
	switch planet {
	case "Mercury":
		return ageInSeconds / (secondsInEarthYear * 0.2408467)
	case "Venus":
		return ageInSeconds / (secondsInEarthYear * 0.61519726)
	case "Earth":
		return ageInSeconds / secondsInEarthYear
	case "Mars":
		return ageInSeconds / (secondsInEarthYear * 1.8808158)
	case "Jupiter":
		return ageInSeconds / (secondsInEarthYear * 11.862615)
	case "Saturn":
		return ageInSeconds / (secondsInEarthYear * 29.447498)
	case "Uranus":
		return ageInSeconds / (secondsInEarthYear * 84.016846)
	case "Neptune":
		return ageInSeconds / (secondsInEarthYear * 164.79132)
	default:
		return 0
	}
}