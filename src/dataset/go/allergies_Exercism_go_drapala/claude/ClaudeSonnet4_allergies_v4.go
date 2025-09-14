package allergies

var allergens = [8]string{
	"eggs", "peanuts", "shellfish", "strawberries",
	"tomatoes", "chocolate", "pollen", "cats",
}

func Allergies(allergies uint) []string {
	if allergies == 0 {
		return nil
	}
	
	allergies &= 255
	result := make([]string, 0, 8)
	
	for i := 0; i < 8; i++ {
		if allergies&(1<<uint(i)) != 0 {
			result = append(result, allergens[i])
		}
	}
	
	return result
}

func AllergicTo(allergies uint, allergen string) bool {
	allergies &= 255
	
	for i := 0; i < 8; i++ {
		if allergens[i] == allergen {
			return allergies&(1<<uint(i)) != 0
		}
	}
	
	return false
}