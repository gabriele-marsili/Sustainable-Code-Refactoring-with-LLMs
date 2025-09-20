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

func Permutations(items []string) func() []string {
	n := len(items)
	sort.Strings(items)
	first := true
	return func() []string {
		if first {
			first = false
			return append([]string(nil), items...)
		}
		for i := n - 2; i >= 0; i-- {
			if items[i] < items[i+1] {
				for j := n - 1; j > i; j-- {
					if items[i] < items[j] {
						items[i], items[j] = items[j], items[i]
						reverse(items[i+1:])
						return append([]string(nil), items...)
					}
				}
			}
		}
		return nil
	}
}

func reverse(items []string) {
	for i, j := 0, len(items)-1; i < j; i, j = i+1, j-1 {
		items[i], items[j] = items[j], items[i]
	}
}

func MakeSolutions(attributeMap map[string][]string) [][]House {
	keys := make([]string, 0, len(attributeMap))
	for k := range attributeMap {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	solutions := [][]House{make([]House, len(attributeMap["Position"]))}
	for i := range solutions[0] {
		solutions[0][i] = make(House)
	}

	for _, key := range keys {
		values := attributeMap[key]
		newSolutions := [][]House{}
		gen := Permutations(values)
		for perm := gen(); perm != nil; perm = gen() {
			for _, sol := range solutions {
				newSol := make([]House, len(sol))
				for i := range sol {
					newSol[i] = make(House)
					for k, v := range sol[i] {
						newSol[i][k] = v
					}
					newSol[i][key] = perm[i]
				}
				newSolutions = append(newSolutions, newSol)
			}
		}
		solutions = newSolutions
	}
	return solutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
	return func(houses []House) bool {
		var pos1, pos2 int
		for i, house := range houses {
			if house[key1] == value1 {
				pos1 = i
			}
			if house[key2] == value2 {
				pos2 = i
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
		"Owner":    {"English", "Spanish", "Ukrainian", "Norwegian", "Japanese"},
		"Pet":      {"Dog", "Snail", "Fox", "Horse", "Zebra"},
		"Drink":    {"Water", "Milk", "Tea", "Orange Juice", "Coffee"},
		"Smoke":    {"Kools", "Old Gold", "Chesterfields", "Lucky Strike", "Parliaments"},
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
		makeRule("Smoke", "Parliaments", "Owner", "Japanese", "same"),
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
				return Solution{DrinksWater: house["Owner"], OwnsZebra: findOwner(sol, "Zebra")}
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