package zebra

import (
	"strconv"
	"strings"
)

type House map[string]string
type Rule func([]House) bool

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func MakeSolutions(attribute_map map[string][]string) [][]House {
	solutions := [][]House{{}}

	for attr, values := range attribute_map {
		newSolutions := make([][]House, 0)
		for _, solution := range solutions {
			for _, val := range values {
				newSolution := make([]House, len(solution))
				copy(newSolution, solution)

				if len(newSolution) == 0 {
					newSolution = append(newSolution, House{attr: val})
				} else {
					newSolution[0][attr] = val
				}
				newSolutions = append(newSolutions, newSolution)
			}
		}
		solutions = newSolutions
	}
	return solutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
	return func(houses []House) bool {
		pos1 := -1
		pos2 := -1
		for i, house := range houses {
			if house[key1] == value1 {
				pos1 = i + 1
			}
			if house[key2] == value2 {
				pos2 = i + 1
			}
		}

		if pos1 == -1 || pos2 == -1 {
			return false // If either value isn't found, the rule fails.
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
			return false // Invalid rule, should not happen
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

	solutions := MakeSolutions(values)

	rules := [](Rule){
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
			for i, house := range houses {
				if i == 2 && house["Drink"] != "Milk" {
					return false
				} else if i != 2 && house["Drink"] == "Milk" {
					return false
				}
			}
			return true
		},
		// 10. The Norwegian lives in the first house.
		func(houses []House) bool {
			return houses[0]["Owner"] == "Norwegian"
		},
		// 11. The man who smokes Chesterfields lives in the house next to the man with the fox.
		func(houses []House) bool {
			chesterfieldsPos := -1
			foxPos := -1
			for i, house := range houses {
				if house["Smoke"] == "Chesterfields" {
					chesterfieldsPos = i
				}
				if house["Pet"] == "Fox" {
					foxPos = i
				}
			}
			if chesterfieldsPos == -1 || foxPos == -1 {
				return false
			}
			return abs(chesterfieldsPos-foxPos) == 1
		},
		// 12. Kools are smoked in the house next to the house where the horse is kept.
		func(houses []House) bool {
			koolsPos := -1
			horsePos := -1
			for i, house := range houses {
				if house["Smoke"] == "Kools" {
					koolsPos = i
				}
				if house["Pet"] == "Horse" {
					horsePos = i
				}
			}
			if koolsPos == -1 || horsePos == -1 {
				return false
			}
			return abs(koolsPos-horsePos) == 1
		},
		// 13. The Lucky Strike smoker drinks orange juice.
		makeRule("Smoke", "Lucky Strike", "Drink", "Orange Juice", "same"),
		// 14. The Japanese smokes Parliaments.
		makeRule("Owner", "Japanese", "Smoke", "Parliaments", "same"),
	}

	filteredSolutions := make([][]House, 0)
	for _, sol := range solutions {
		valid := true
		for _, rule := range rules {
			if !rule(sol) {
				valid = false
				break
			}
		}
		if valid {
			filteredSolutions = append(filteredSolutions, sol)
		}
	}

	waterDrinker := ""
	zebraOwner := ""

	for _, house := range filteredSolutions[0] {
		if house["Drink"] == "Water" {
			for owner, val := range house {
				if owner == "Owner" {
					waterDrinker = val
				}
			}
		}
		if house["Pet"] == "Zebra" {
			for owner, val := range house {
				if owner == "Owner" {
					zebraOwner = val
				}
			}
		}
	}

	return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func atoi(s string) int {
	i, _ := strconv.Atoi(s)
	return i
}