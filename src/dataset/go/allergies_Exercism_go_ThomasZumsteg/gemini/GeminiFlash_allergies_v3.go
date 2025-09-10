package allergies

var allergieList = []string{
	"eggs",
	"peanuts",
	"shellfish",
	"strawberries",
	"tomatoes",
	"chocolate",
	"pollen",
	"cats",
}

var allergieMap = map[string]int{
	"eggs":        1,
	"peanuts":     2,
	"shellfish":   4,
	"strawberries": 8,
	"tomatoes":    16,
	"chocolate":   32,
	"pollen":      64,
	"cats":        128,
}

func Allergies(code int) []string {
	allergies := make([]string, 0, len(allergieList))
	for i, allergy := range allergieList {
		if code&(1<<uint(i)) != 0 {
			allergies = append(allergies, allergy)
		}
	}
	return allergies
}

func AllergicTo(code int, allergen string) bool {
	allergenValue, ok := allergieMap[allergen]
	if !ok {
		return false
	}
	return code&allergenValue != 0
}