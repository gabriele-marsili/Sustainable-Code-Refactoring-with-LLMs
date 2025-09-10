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
	for i, allergy := range allergieList {
		if allergy == allergen {
			return code&(1<<uint(i)) != 0
		}
	}
	return false
}