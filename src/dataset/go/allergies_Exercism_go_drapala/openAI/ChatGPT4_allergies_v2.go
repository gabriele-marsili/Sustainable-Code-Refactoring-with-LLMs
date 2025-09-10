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
	for _, allergen := range allergyList {
		if allergies&allergen.score != 0 {
			result = append(result, allergen.food)
		}
	}
	return result
}

func AllergicTo(allergies uint, allergen string) bool {
	for _, a := range allergyList {
		if a.food == allergen && allergies&a.score != 0 {
			return true
		}
	}
	return false
}