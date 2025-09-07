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
			if n%2 == 1 {
				arr[0], arr[n-1] = arr[n-1], arr[0]
			} else {
				arr[i], arr[n-1] = arr[n-1], arr[i]
			}
		}
	}
	permute(items, len(items))
	return result
}

func MakeSolutions(attributeMap map[string][]string) [][]House {
	positions := attributeMap["Position"]
	permutations := Permutations(positions)
	solutions := make([][]House, 0, len(permutations))

	for _, perm := range permutations {
		houses := make([]House, len(positions))
		for i, pos := range perm {
			houses[i] = House{"Position": pos}
		}
		solutions = append(solutions, houses)
	}

	for attr, values := range attributeMap {
		if attr == "Position" {
			continue
		}
		newSolutions := [][]House{}
		permutations := Permutations(values)
		for _, solution := range solutions {
			for _, perm := range permutations {
				newHouses := make([]House, len(solution))
				for i := range solution {
					newHouses[i] = make(House)
					for k, v := range solution[i] {
						newHouses[i][k] = v
					}
					newHouses[i][attr] = perm[i]
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
		"Position": strings.Split("1,2,3,4,5", ","),
		"Owner":    strings.Split("English,Spanish,Ukrainian,Norwegian,Japanese", ","),
		"Pet":      strings.Split("Dog,Snail,Fox,Horse,Zebra", ","),
		"Drink":    strings.Split("Water,Milk,Tea,Orange Juice,Coffee", ","),
		"Smoke":    strings.Split("Kools,Old Gold,Chesterfields,Lucky Strike,Parliaments", ","),
		"Color":    strings.Split("Red,Green,Ivory,Yellow,Blue", ","),
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
		makeRule("Smoke", "Parliaments", "Owner", "Japanese", "same"),
	}

	for _, rule := range rules {
		filteredSolutions := [][]House{}
		for _, solution := range solutions {
			if rule(solution) {
				filteredSolutions = append(filteredSolutions, solution)
			}
		}
		solutions = filteredSolutions
	}

	for _, solution := range solutions {
		for _, house := range solution {
			if house["Drink"] == "Water" {
				return Solution{DrinksWater: house["Owner"], OwnsZebra: findOwner(solution, "Zebra")}
			}
		}
	}
	return Solution{}
}

func findOwner(houses []House, pet string) string {
	for _, house := range houses {
		if house["Pet"] == pet {
			return house["Owner"]
		}
	}
	return ""
}