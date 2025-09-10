package allergies

var scoreToAllergen = map[int]string{
	1:   "eggs",
	2:   "peanuts",
	4:   "shellfish",
	8:   "strawberries",
	16:  "tomatoes",
	32:  "chocolate",
	64:  "pollen",
	128: "cats",
}

var allergenScores = []int{128, 64, 32, 16, 8, 4, 2, 1}

func Allergies(score uint) (allergies []string) {
	score %= 256
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
	allergenScore := 0
	for k, v := range scoreToAllergen {
		if v == allergen {
			allergenScore = k
			break
		}
	}
	return score&uint(allergenScore) != 0
}