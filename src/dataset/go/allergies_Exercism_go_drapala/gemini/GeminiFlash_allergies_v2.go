package allergies

var allergyList = []struct {
	food  string
	score uint
}{
	{"eggs", 1},
	{"peanuts", 2},
	{"shellfish", 4},
	{"strawberries", 8},
	{"tomatoes", 16},
	{"chocolate", 32},
	{"pollen", 64},
	{"cats", 128},
}

func Allergies(score uint) []string {
	allergies := make([]string, 0, len(allergyList))
	for i := len(allergyList) - 1; i >= 0; i-- {
		if score >= allergyList[i].score {
			allergies = append(allergies, allergyList[i].food)
			score -= allergyList[i].score
		}
	}

	// Reverse the slice to maintain original order
	for i, j := 0, len(allergies)-1; i < j; i, j = i+1, j-1 {
		allergies[i], allergies[j] = allergies[j], allergies[i]
	}

	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	for i := len(allergyList) - 1; i >= 0; i-- {
		if allergyList[i].food == allergen {
			return (score & allergyList[i].score) != 0
		}
	}
	return false
}