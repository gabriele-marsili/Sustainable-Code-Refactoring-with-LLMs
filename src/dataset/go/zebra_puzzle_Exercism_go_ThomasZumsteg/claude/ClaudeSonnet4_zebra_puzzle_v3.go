package zebra

import (
	"strings"
	"strconv"
)

type House map[string]string
type Rule func([]House) bool

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

type ByHash []string

func (a ByHash) Len() int           { return len(a) }
func (a ByHash) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByHash) Less(i, j int) bool { return a[i] < a[j] }

func Permutations(items []string) func() []string {
	n_items := len(items)
	perm := make([]string, n_items)
	copy(perm, items)
	
	for i := 0; i < n_items-1; i++ {
		for j := i + 1; j < n_items; j++ {
			if perm[i] > perm[j] {
				perm[i], perm[j] = perm[j], perm[i]
			}
		}
	}
	
	first := true
	return func() []string {
		if first {
			first = false
			result := make([]string, n_items)
			copy(result, perm)
			return result
		}
		
		k := n_items - 2
		for k >= 0 && perm[k] >= perm[k+1] {
			k--
		}
		if k < 0 {
			return nil
		}
		
		i := n_items - 1
		for perm[k] >= perm[i] {
			i--
		}
		
		perm[k], perm[i] = perm[i], perm[k]
		
		for i, j := k+1, n_items-1; i < j; i, j = i+1, j-1 {
			perm[i], perm[j] = perm[j], perm[i]
		}
		
		result := make([]string, n_items)
		copy(result, perm)
		return result
	}
}

func MakeSolutions(attribute_map map[string][]string) [][]House {
	var solutions [][]House
	attributes := make([]string, 0, len(attribute_map))
	values := make([][]string, 0, len(attribute_map))
	
	for attr, vals := range attribute_map {
		attributes = append(attributes, attr)
		values = append(values, vals)
	}
	
	if len(attributes) == 0 {
		return solutions
	}
	
	first_houses := make([]House, len(values[0]))
	for i, val := range values[0] {
		first_houses[i] = House{attributes[0]: val}
	}
	solutions = append(solutions, first_houses)
	
	for attrIdx := 1; attrIdx < len(attributes); attrIdx++ {
		attr := attributes[attrIdx]
		vals := values[attrIdx]
		new_solutions := make([][]House, 0, len(solutions)*factorial(len(vals)))
		
		for _, houses := range solutions {
			gen := Permutations(vals)
			for perm := gen(); perm != nil; perm = gen() {
				new_houses := make([]House, len(houses))
				for i, house := range houses {
					new_house := make(House, len(house)+1)
					for k, v := range house {
						new_house[k] = v
					}
					new_house[attr] = perm[i]
					new_houses[i] = new_house
				}
				new_solutions = append(new_solutions, new_houses)
			}
		}
		solutions = new_solutions
	}
	return solutions
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
			if found1 && found2 {
				break
			}
		}
		
		switch position {
		case "same":
			return pos1 == pos2
		case "right":
			return pos1 + 1 == pos2
		case "left":
			return pos1 == pos2 + 1
		case "next to":
			return pos1+1 == pos2 || pos1 == pos2+1
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
		if len(solutions) == 0 {
			break
		}
	}

	if len(solutions) == 0 {
		return Solution{DrinksWater: "", OwnsZebra: ""}
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