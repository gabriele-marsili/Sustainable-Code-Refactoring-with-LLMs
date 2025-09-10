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

func Allergies(score uint) (allergies []string) {
	for k, allergen := range scoreToAllergen {
		if score&uint(k) != 0 {
			allergies = append(allergies, allergen)
		}
	}
	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	allergenScore := 0
	for k, v := range scoreToAllergen {
		if v == allergen {
			allergenScore = k
			break
		}
	}
	if allergenScore == 0 {
		return false // Allergen not found
	}
	return score&uint(allergenScore) != 0
}