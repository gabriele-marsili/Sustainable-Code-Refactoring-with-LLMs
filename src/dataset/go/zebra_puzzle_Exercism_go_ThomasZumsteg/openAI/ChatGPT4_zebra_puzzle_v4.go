package zebra

import (
	"sort"
	"strconv"
	"strings"
)

type House map[string]string
type Rule func([]House) bool

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func Permutations(items []string) [][]string {
	var result [][]string
	var permute func([]string, int)
	permute = func(arr []string, n int) {
		if n == 1 {
			tmp := make([]string, len(arr))
			copy(tmp, arr)
			result = append(result, tmp)
			return
		}
		for i := 0; i < n; i++ {
			permute(arr, n-1)
			if n%2 == 0 {
				arr[i], arr[n-1] = arr[n-1], arr[i]
			} else {
				arr[0], arr[n-1] = arr[n-1], arr[0]
			}
		}
	}
	permute(items, len(items))
	return result
}

func MakeSolutions(attributeMap map[string][]string) [][]House {
	keys := make([]string, 0, len(attributeMap))
	for key := range attributeMap {
		keys = append(keys, key)
	}
	sort.Strings(keys)

	permutations := map[string][][]string{}
	for key, values := range attributeMap {
		permutations[key] = Permutations(values)
	}

	var combine func(int, []House) [][]House
	combine = func(idx int, current []House) [][]House {
		if idx == len(keys) {
			tmp := make([]House, len(current))
			for i := range current {
				tmp[i] = make(House)
				for k, v := range current[i] {
					tmp[i][k] = v
				}
			}
			return [][]House{tmp}
		}

		key := keys[idx]
		var results [][]House
		for _, perm := range permutations[key] {
			newHouses := make([]House, len(current))
			for i := range current {
				newHouses[i] = make(House)
				for k, v := range current[i] {
					newHouses[i][k] = v
				}
				newHouses[i][key] = perm[i]
			}
			results = append(results, combine(idx+1, newHouses)...)
		}
		return results
	}

	initial := make([]House, len(attributeMap["Position"]))
	for i := range initial {
		initial[i] = House{"Position": attributeMap["Position"][i]}
	}
	return combine(1, initial)
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
		filtered := solutions[:0]
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