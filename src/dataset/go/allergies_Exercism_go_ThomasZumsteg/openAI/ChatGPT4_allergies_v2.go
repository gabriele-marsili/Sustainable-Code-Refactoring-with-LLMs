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

var allergieMap = func() map[string]int {
	m := make(map[string]int, len(allergieList))
	for i, allergy := range allergieList {
		m[allergy] = 1 << i
	}
	return m
}()

func Allergies(code int) []string {
	allergies := make([]string, 0, len(allergieList))
	for i, allergy := range allergieList {
		if code&(1<<i) != 0 {
			allergies = append(allergies, allergy)
		}
	}
	return allergies
}

func AllergicTo(code int, allergen string) bool {
	if mask, exists := allergieMap[allergen]; exists {
		return code&mask != 0
	}
	return false
}