package allergies

/*allergieList is an ordered list of things to be allergic to
it corrosponds to the bits in an integer code*/
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

var allergenMap = map[string]int{
	"eggs":         0,
	"peanuts":      1,
	"shellfish":    2,
	"strawberries": 3,
	"tomatoes":     4,
	"chocolate":    5,
	"pollen":       6,
	"cats":         7,
}

/*Allergies determines all things things that person is allergic to
based on a code*/
func Allergies(code int) []string {
	if code == 0 {
		return nil
	}
	
	allergies := make([]string, 0, 8)
	for i := 0; i < 8 && code > 0; i++ {
		if code&1 == 1 {
			allergies = append(allergies, allergieList[i])
		}
		code >>= 1
	}
	return allergies
}

/*AllergicTo determines if a person is allergic to an item*/
func AllergicTo(code int, allergen string) bool {
	if bit, exists := allergenMap[allergen]; exists {
		return code&(1<<bit) != 0
	}
	return false
}