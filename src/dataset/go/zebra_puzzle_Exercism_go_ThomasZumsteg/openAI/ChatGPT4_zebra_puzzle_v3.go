package zebra

import (
	"strings"
	"sort"
	"strconv"
)

type House map[string]string
type Rule func([]House) bool

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func Permutations(items []string) [][]string {
	var result [][]string
	sort.Strings(items)
	perm := make([]string, len(items))
	copy(perm, items)
	result = append(result, append([]string{}, perm...))
	for {
		i := len(perm) - 2
		for i >= 0 && perm[i] >= perm[i+1] {
			i--
		}
		if i < 0 {
			break
		}
		j := len(perm) - 1
		for perm[j] <= perm[i] {
			j--
		}
		perm[i], perm[j] = perm[j], perm[i]
		for k, l := i+1, len(perm)-1; k < l; k, l = k+1, l-1 {
			perm[k], perm[l] = perm[l], perm[k]
		}
		result = append(result, append([]string{}, perm...))
	}
	return result
}

func MakeSolutions(attributeMap map[string][]string) [][]House {
	keys := make([]string, 0, len(attributeMap))
	for k := range attributeMap {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	permutations := Permutations(attributeMap["Position"])
	solutions := make([][]House, 0, len(permutations))
	for _, perm := range permutations {
		houses := make([]House, len(perm))
		for i, pos := range perm {
			houses[i] = House{"Position": pos}
		}
		solutions = append(solutions, houses)
	}

	for _, key := range keys {
		if key == "Position" {
			continue
		}
		newSolutions := [][]House{}
		for _, sol := range solutions {
			perms := Permutations(attributeMap[key])
			for _, perm := range perms {
				newHouses := make([]House, len(sol))
				for i := range sol {
					newHouses[i] = make(House)
					for k, v := range sol[i] {
						newHouses[i][k] = v
					}
					newHouses[i][key] = perm[i]
				}
				newSolutions = append(newSolutions, newHouses)
			}
		}
		solutions = newSolutions
	}
	return solutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
	return func(houses []House) bool {
		var pos1, pos2 int
		for _, house := range houses {
			if house[key1] == value1 {
				pos1, _ = strconv.Atoi(house["Position"])
			}
			if house[key2] == value2 {
				pos2, _ = strconv.Atoi(house["Position"])
			}
		}
		switch position {
		case "same":
			return pos1 == pos2
		case "right":
			return pos1+1 == pos2
		case "left":
			return pos1 == pos2+1
		case "next to":
			return abs(pos1-pos2) == 1
		}
		return false
	}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func SolvePuzzle() Solution {
	values := map[string][]string{
		"Position": {"1", "2", "3", "4", "5"},
		"Owners":   {"English", "Spanish", "Ukrainian", "Norwegian", "Japanese"},
		"Pets":     {"Dog", "Snail", "Fox", "Horse", "Zebra"},
		"Drink":    {"Water", "Milk", "Tea", "Orange Juice", "Coffee"},
		"Smokes":   {"Kools", "Old Gold", "Chesterfields", "Lucky Strike", "Parliaments"},
		"Color":    {"Red", "Green", "Ivory", "Yellow", "Blue"},
	}

	solutions := MakeSolutions(values)
	rules := []Rule{
		makeRule("Owners", "English", "Color", "Red", "same"),
		makeRule("Owners", "Spanish", "Pets", "Dog", "same"),
		makeRule("Drink", "Coffee", "Color", "Green", "same"),
		makeRule("Owners", "Ukrainian", "Drink", "Tea", "same"),
		makeRule("Color", "Green", "Color", "Ivory", "right"),
		makeRule("Smokes", "Old Gold", "Pets", "Snail", "same"),
		makeRule("Smokes", "Kools", "Color", "Yellow", "same"),
		makeRule("Position", "3", "Drink", "Milk", "same"),
		makeRule("Position", "1", "Owners", "Norwegian", "same"),
		makeRule("Smokes", "Chesterfields", "Pets", "Fox", "next to"),
		makeRule("Smokes", "Kools", "Pets", "Horse", "next to"),
		makeRule("Smokes", "Lucky Strike", "Drink", "Orange Juice", "same"),
		makeRule("Smokes", "Parliaments", "Owners", "Japanese", "same"),
	}

	for _, rule := range rules {
		filtered := [][]House{}
		for _, sol := range solutions {
			if rule(sol) {
				filtered = append(filtered, sol)
			}
		}
		solutions = filtered
	}

	for _, sol := range solutions {
		for _, house := range sol {
			if house["Drink"] == "Water" {
				return Solution{DrinksWater: house["Owners"], OwnsZebra: findOwner(sol, "Zebra")}
			}
		}
	}
	return Solution{}
}

func findOwner(houses []House, pet string) string {
	for _, house := range houses {
		if house["Pets"] == pet {
			return house["Owners"]
		}
	}
	return ""
}