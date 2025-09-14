package allergies

var allergenList = []struct {
	score int
	name  string
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

var allergenMap = map[string]int{
	"cats":         128,
	"pollen":       64,
	"chocolate":    32,
	"tomatoes":     16,
	"strawberries": 8,
	"shellfish":    4,
	"peanuts":      2,
	"eggs":         1,
}

func Allergies(score uint) []string {
	score &= 255
	
	allergies := make([]string, 0, 8)
	for _, allergen := range allergenList {
		if score&uint(allergen.score) != 0 {
			allergies = append(allergies, allergen.name)
		}
	}
	return allergies
}

func AllergicTo(score uint, allergen string) bool {
	allergenScore, exists := allergenMap[allergen]
	if !exists {
		return false
	}
	return (score&255)&uint(allergenScore) != 0
}