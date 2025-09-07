package zebra

import (
	"strconv"
)

type House map[string]string
type Rule func([]House) bool

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func generatePermutations(arr []string, result *[][]string) {
	if len(arr) <= 1 {
		perm := make([]string, len(arr))
		copy(perm, arr)
		*result = append(*result, perm)
		return
	}
	
	for i := 0; i < len(arr); i++ {
		rest := make([]string, 0, len(arr)-1)
		rest = append(rest, arr[:i]...)
		rest = append(rest, arr[i+1:]...)
		
		generatePermutations(rest, result)
		
		for j := len(*result) - factorial(len(arr)-1); j < len(*result); j++ {
			(*result)[j] = append([]string{arr[i]}, (*result)[j]...)
		}
	}
}

func factorial(n int) int {
	if n <= 1 {
		return 1
	}
	result := 1
	for i := 2; i <= n; i++ {
		result *= i
	}
	return result
}

func MakeSolutions(attribute_map map[string][]string) [][]House {
	var solutions [][]House
	
	attributes := make([]string, 0, len(attribute_map))
	values := make([][]string, 0, len(attribute_map))
	
	for attr, vals := range attribute_map {
		attributes = append(attributes, attr)
		values = append(values, vals)
	}
	
	var generate func(int, []House)
	generate = func(attrIndex int, currentHouses []House) {
		if attrIndex == len(attributes) {
			solution := make([]House, len(currentHouses))
			for i, house := range currentHouses {
				newHouse := make(House)
				for k, v := range house {
					newHouse[k] = v
				}
				solution[i] = newHouse
			}
			solutions = append(solutions, solution)
			return
		}
		
		attr := attributes[attrIndex]
		vals := values[attrIndex]
		
		if attrIndex == 0 {
			for _, val := range vals {
				house := House{attr: val}
				generate(attrIndex+1, []House{house})
			}
		} else {
			var perms [][]string
			generatePermutations(vals, &perms)
			
			for _, perm := range perms {
				newHouses := make([]House, len(currentHouses))
				for i, house := range currentHouses {
					newHouse := make(House)
					for k, v := range house {
						newHouse[k] = v
					}
					if i < len(perm) {
						newHouse[attr] = perm[i]
					}
					newHouses[i] = newHouse
				}
				generate(attrIndex+1, newHouses)
			}
		}
	}
	
	generate(0, nil)
	return solutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
	return func(houses []House) bool {
		var pos1, pos2 int
		found1, found2 := false, false
		
		for _, house := range houses {
			if house[key1] == value1 {
				if posStr, ok := house["Position"]; ok {
					pos1, _ = strconv.Atoi(posStr)
					found1 = true
				}
			}
			if house[key2] == value2 {
				if posStr, ok := house["Position"]; ok {
					pos2, _ = strconv.Atoi(posStr)
					found2 = true
				}
			}
		}
		
		if !found1 || !found2 {
			return false
		}
		
		switch position {
		case "same":
			return pos1 == pos2
		case "right":
			return pos1 + 1 == pos2
		case "left":
			return pos1 == pos2 + 1
		case "next to":
			return (pos1+1 == pos2) || (pos1 == pos2+1)
		}
		return false
	}
}

func SolvePuzzle() Solution {
	values := map[string][]string{
		"Position": {"1", "2", "3", "4", "5"},
		"Owner":    {"English", "Spanish", "Ukrainian", "Norwegian", "Japanese"},
		"Pet":      {"Dog", "Snail", "Fox", "Horse", "Zebra"},
		"Drink":    {"Water", "Milk", "Tea", "Orange Juice", "Coffee"},
		"Smoke":    {"Kools", "Old Gold", "Chesterfields", "Lucky Strike", "Parliament"},
		"Color":    {"Red", "Green", "Ivory", "Yellow", "Blue"},
	}

	solutions := MakeSolutions(values)
	
	rules := []Rule{
		makeRule("Owner", "English", "Color", "Red", "same"),
		makeRule("Owner", "Spanish", "Pet", "Dog", "same"),
		makeRule("Drink", "Coffee", "Color", "Green", "same"),
		makeRule("Owner", "Ukrainian", "Drink", "Tea", "same"),
		makeRule("Color", "Green", "Color", "Ivory", "right"),
		makeRule("Smoke", "Old Gold", "Pet", "Snail", "same"),
		makeRule("Smoke", "Kools", "Color", "Yellow", "same"),
		makeRule("Position", "3", "Drink", "Milk", "same"),
		makeRule("Position", "1", "Owner", "Norwegian", "same"),
		makeRule("Smoke", "Chesterfields", "Pet", "Fox", "next to"),
		makeRule("Smoke", "Kools", "Pet", "Horse", "next to"),
		makeRule("Smoke", "Lucky Strike", "Drink", "Orange Juice", "same"),
		makeRule("Owner", "Japanese", "Smoke", "Parliament", "same"),
	}

	for _, rule := range rules {
		filtered := make([][]House, 0, len(solutions))
		for _, sol := range solutions {
			if rule(sol) {
				filtered = append(filtered, sol)
			}
		}
		solutions = filtered
	}

	if len(solutions) == 0 {
		return Solution{}
	}

	solution := solutions[0]
	var drinksWater, ownsZebra string

	for _, house := range solution {
		if house["Drink"] == "Water" {
			drinksWater = house["Owner"]
		}
		if house["Pet"] == "Zebra" {
			ownsZebra = house["Owner"]
		}
	}

	return Solution{DrinksWater: drinksWater, OwnsZebra: ownsZebra}
}