package allergies

var allergyList = [8]struct {
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

var allergyMap = map[string]uint{
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
	if allergies == 0 {
		return nil
	}
	
	result := make([]string, 0, 8)
	for i := 0; i < 8; i++ {
		if allergies&allergyList[i].score != 0 {
			result = append(result, allergyList[i].food)
		}
	}
	return result
}

func AllergicTo(allergies uint, allergen string) bool {
	if score, exists := allergyMap[allergen]; exists {
		return allergies&score != 0
	}
	return false
}