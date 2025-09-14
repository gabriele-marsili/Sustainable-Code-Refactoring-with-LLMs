package allergies

var scoreToAllergen = map[int]string{
	128: "cats",
	64:  "pollen",
	32:  "chocolate",
	16:  "tomatoes",
	8:   "strawberries",
	4:   "shellfish",
	2:   "peanuts",
	1:   "eggs",
}

var allergenToScore = map[string]int{
	"cats":         128,
	"pollen":       64,
	"chocolate":    32,
	"tomatoes":     16,
	"strawberries": 8,
	"shellfish":    4,
	"peanuts":      2,
	"eggs":         1,
}

var orderedScores = []int{128, 64, 32, 16, 8, 4, 2, 1}

func Allergies(score uint) []string {
	score &= 255 // equivalent to score % 256 but faster

	allergies := make([]string, 0, 8) // pre-allocate with max capacity
	
	for _, key := range orderedScores {
		if score&uint(key) != 0 {
			allergies = append(allergies, scoreToAllergen[key])
		}
	}
	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	allergenScore, exists := allergenToScore[allergen]
	if !exists {
		return false
	}
	score &= 255
	return score&uint(allergenScore) != 0
}