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

/*Allergies determines all things things that person is allergic to
based on a code*/
func Allergies(code int) []string {
	allergies := make([]string, 0, len(allergieList))
	for i, allergy := range allergieList {
		if code&(1<<uint(i)) != 0 {
			allergies = append(allergies, allergy)
		}
	}
	return allergies
}

/*AllergicTo determines if a person is allergic to an item*/
func AllergicTo(code int, allergen string) bool {
	for i := range allergieList {
		if allergieList[i] == allergen {
			return code&(1<<uint(i)) != 0
		}
	}
	return false
}