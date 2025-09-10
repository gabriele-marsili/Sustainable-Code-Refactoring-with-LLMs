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

var allergenScores = []int{128, 64, 32, 16, 8, 4, 2, 1}

func Allergies(score uint) (allergies []string) {
	score %= 256 // Equivalent to score >= 256 { score = score % 256 } but more concise

	for _, allergenScore := range allergenScores {
		if score >= uint(allergenScore) {
			allergies = append(allergies, scoreToAllergen[allergenScore])
			score -= uint(allergenScore)
		}
	}
	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	score %= 256

	for _, allergenScore := range allergenScores {
		if score >= uint(allergenScore) {
			if scoreToAllergen[allergenScore] == allergen {
				return true
			}
			score -= uint(allergenScore)
		}
	}
	return false
}