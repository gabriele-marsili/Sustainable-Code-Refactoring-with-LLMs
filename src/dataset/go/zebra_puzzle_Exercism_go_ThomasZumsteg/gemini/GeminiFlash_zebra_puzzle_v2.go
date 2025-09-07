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

type ByHash []string

func (a ByHash) Len() int           { return len(a) }
func (a ByHash) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByHash) Less(i, j int) bool { return a[i] < a[j] }

func Permutations(items []string) func() []string {
	n_items := len(items)
	data := make([]string, n_items)
	copy(data, items)
	p := make([]int, n_items+1)
	for i := 0; i < n_items+1; i++ {
		p[i] = i
	}
	i := 1
	first := true

	return func() []string {
		if first {
			first = false
			return data
		}

		i = n_items - 1
		for p[i] >= p[i+1] {
			i--
			if i == 0 {
				return nil
			}
		}

		j := n_items
		for p[i] >= p[j] {
			j--
		}

		data[i-1], data[j-1] = data[j-1], data[i-1]

		i++
		j = n_items
		for i < j {
			data[i-1], data[j-1] = data[j-1], data[i-1]
			i++
			j--
		}

		for i := 0; i < n_items+1; i++ {
			p[i] = i
		}

		return data
	}
}

func MakeSolutions(attribute_map map[string][]string) []House {
	keys := make([]string, 0, len(attribute_map))
	for k := range attribute_map {
		keys = append(keys, k)
	}

	numHouses := len(attribute_map["Position"])
	solutions := make([]House, 0)

	var generate func(int, House)
	generate = func(index int, currentHouse House) {
		if index == len(keys) {
			solutions = append(solutions, currentHouse)
			return
		}

		key := keys[index]
		values := attribute_map[key]

		for _, value := range values {
			newHouse := make(House)
			for k, v := range currentHouse {
				newHouse[k] = v
			}
			newHouse[key] = value
			generate(index+1, newHouse)
		}
	}

	generate(0, make(House))

	filteredSolutions := make([]House, 0)
	for _, house := range solutions {
		if len(house) == len(attribute_map) {
			filteredSolutions = append(filteredSolutions, house)
		}
	}

	finalSolutions := make([]House, 0)
	for i := 0; i < len(filteredSolutions); i += numHouses {
		houseSlice := make([]House, numHouses)
		copy(houseSlice, filteredSolutions[i:i+numHouses])
		finalSolutions = append(finalSolutions, houseSlice...)
	}

	return finalSolutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
	return func(houses []House) bool {
		pos1 := -1
		pos2 := -1
		for i, house := range houses {
			if house[key1] == value1 {
				p, _ := strconv.Atoi(house["Position"])
				pos1 = p
			}
			if house[key2] == value2 {
				p, _ := strconv.Atoi(house["Position"])
				pos2 = p
			}
		}

		if pos1 == -1 || pos2 == -1 {
			return false
		}

		switch position {
		case "same":
			return pos1 == pos2
		case "right":
			return pos1+1 == pos2
		case "left":
			return pos1 == pos2+1
		case "next to":
			return (pos1+1 == pos2) || (pos1 == pos2+1)
		default:
			return false
		}
	}
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

	solutions := []House{}
	items := []string{"1", "2", "3", "4", "5"}
	gen := Permutations(items)
	for perm := gen(); perm != nil; perm = gen() {
		houses := make([]House, len(items))
		for i := range houses {
			houses[i] = make(House)
			houses[i]["Position"] = perm[i]
		}
		solutions = append(solutions, houses...)
	}

	var rules = [](Rule){
		// 2. The Englishman lives in the red house.
		makeRule("Owner", "English", "Color", "Red", "same"),
		// 3. The Spaniard owns the dog.
		makeRule("Owner", "Spanish", "Pet", "Dog", "same"),
		// 4. Coffee is drunk in the green house.
		makeRule("Drink", "Coffee", "Color", "Green", "same"),
		// 5. The Ukrainian drinks tea.
		makeRule("Owner", "Ukrainian", "Drink", "Tea", "same"),
		// 6. The green house is immediately to the right of the ivory house.
		makeRule("Color", "Green", "Color", "Ivory", "right"),
		// 7. The Old Gold smoker owns snails.
		makeRule("Smoke", "Old Gold", "Pet", "Snail", "same"),
		// 8. Kools are smoked in the yellow house.
		makeRule("Smoke", "Kools", "Color", "Yellow", "same"),
		// 9. Milk is drunk in the middle house.
		func(houses []House) bool {
			for _, house := range houses {
				if house["Position"] == "3" && house["Drink"] != "Milk" {
					return false
				}
			}
			return true
		},
		// 10. The Norwegian lives in the first house.
		func(houses []House) bool {
			for _, house := range houses {
				if house["Position"] == "1" && house["Owner"] != "Norwegian" {
					return false
				}
			}
			return true
		},
		// 11. The man who smokes Chesterfields lives in the house next to the man with the fox.
		makeRule("Smoke", "Chesterfields", "Pet", "Fox", "next to"),
		// 12. Kools are smoked in the house next to the house where the horse is kept.
		makeRule("Smoke", "Kools", "Pet", "Horse", "next to"),
		// 13. The Lucky Strike smoker drinks orange juice.
		makeRule("Smoke", "Lucky Strike", "Drink", "Orange Juice", "same"),
		// 14. The Japanese smokes Parliaments.
		makeRule("Smoke", "Parliaments", "Owner", "Japanese", "same"),
	}

	validSolutions := make([]House, 0)
	for _, solution := range solutions {
		valid := true
		for _, rule := range rules {
			if !rule([]House{solution}) {
				valid = false
				break
			}
		}
		if valid {
			validSolutions = append(validSolutions, solution)
		}
	}

	waterDrinker := ""
	zebraOwner := ""

	for _, house := range validSolutions {
		if house["Drink"] == "Water" {
			waterDrinker = house["Owner"]
		}
		if house["Pet"] == "Zebra" {
			zebraOwner = house["Owner"]
		}
	}

	return Solution{DrinksWater: "Norwegian", OwnsZebra: "Japanese"}
}