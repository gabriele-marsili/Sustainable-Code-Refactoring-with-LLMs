package allergies

var allergens = [8]string{
	"eggs",
	"peanuts",
	"shellfish",
	"strawberries",
	"tomatoes",
	"chocolate",
	"pollen",
	"cats",
}

func Allergies(score uint) []string {
	score &= 255
	
	if score == 0 {
		return nil
	}
	
	allergies := make([]string, 0, 8)
	for i := 0; i < 8; i++ {
		if score&(1<<i) != 0 {
			allergies = append(allergies, allergens[i])
		}
	}
	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	score &= 255
	
	for i := 0; i < 8; i++ {
		if allergens[i] == allergen {
			return score&(1<<i) != 0
		}
	}
	return false
}