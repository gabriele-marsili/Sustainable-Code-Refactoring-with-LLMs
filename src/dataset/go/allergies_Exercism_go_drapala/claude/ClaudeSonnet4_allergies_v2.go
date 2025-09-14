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

var allergenMap = map[string]uint{
	"eggs":         1,
	"peanuts":      2,
	"shellfish":    4,
	"strawberries": 8,
	"tomatoes":     16,
	"chocolate":    32,
	"pollen":       64,
	"cats":         128,
}

func Allergies(allergies uint) []string {
	var result []string
	for _, allergy := range allergyList {
		if allergies&allergy.score != 0 {
			result = append(result, allergy.food)
		}
	}
	return result
}

func AllergicTo(allergies uint, allergen string) bool {
	if score, exists := allergenMap[allergen]; exists {
		return allergies&score != 0
	}
	return false
}