package allergies

var scoreToAllergen = []struct {
	score    uint
	allergen string
}{
	{128, "cats"},
	{64, "pollen"},
	{32, "chocolate"},
	{16, "tomatoes"},
	{8, "strawberries"},
	{4, "shellfish"},
	{2, "peanuts"},
	{1, "eggs"},
}

func Allergies(score uint) (allergies []string) {
	score %= 256
	for _, entry := range scoreToAllergen {
		if score >= entry.score {
			allergies = append(allergies, entry.allergen)
			score -= entry.score
		}
	}
	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	score %= 256
	for _, entry := range scoreToAllergen {
		if score >= entry.score {
			if entry.allergen == allergen {
				return true
			}
			score -= entry.score
		}
	}
	return false
}