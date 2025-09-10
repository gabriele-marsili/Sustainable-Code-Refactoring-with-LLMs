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

func Allergies(allergies uint) []string {
	var result []string
	for _, item := range allergyList {
		if allergies&item.score != 0 {
			result = append(result, item.food)
		}
	}
	return result
}

func AllergicTo(allergies uint, allergen string) bool {
	for _, item := range allergyList {
		if item.food == allergen {
			return allergies&item.score != 0
		}
	}
	return false
}