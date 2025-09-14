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

var orderedScores = []int{128, 64, 32, 16, 8, 4, 2, 1}

func Allergies(score uint) (allergies []string) {
	score = score & 255 // equivalent to score % 256 but faster

	for _, key := range orderedScores {
		if score&uint(key) != 0 {
			allergies = append(allergies, scoreToAllergen[key])
		}
	}
	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	score = score & 255

	for _, key := range orderedScores {
		if scoreToAllergen[key] == allergen {
			return score&uint(key) != 0
		}
	}
	return false
}