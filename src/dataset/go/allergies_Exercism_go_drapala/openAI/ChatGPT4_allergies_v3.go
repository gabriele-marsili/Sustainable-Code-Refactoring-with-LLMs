package allergies

import "fmt"

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

func contains(food string, foods map[string]struct{}) bool {
	_, exists := foods[food]
	return exists
}

func getFood(x uint, foods *map[string]struct{}) error {
	if x == 0 {
		return nil
	}

	for i := len(allergyList) - 1; i >= 0; i-- {
		if allergyList[i].score <= x {
			if !contains(allergyList[i].food, *foods) {
				(*foods)[allergyList[i].food] = struct{}{}
			}
			return getFood(x-allergyList[i].score, foods)
		}
	}

	return fmt.Errorf("this score cannot be met with given allergens")
}

func Allergies(allergies uint) []string {
	foods := make(map[string]struct{})
	_ = getFood(allergies, &foods)

	result := make([]string, 0, len(foods))
	for food := range foods {
		result = append(result, food)
	}
	return result
}

func AllergicTo(allergies uint, allergen string) bool {
	foods := make(map[string]struct{})
	_ = getFood(allergies, &foods)
	return contains(allergen, foods)
}