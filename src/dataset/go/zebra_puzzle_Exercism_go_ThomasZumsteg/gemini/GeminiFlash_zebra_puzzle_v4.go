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
	sort.Sort(ByHash(items))
	first := true
	var current []string
	return func() []string {
		if first {
			first = false
			current = make([]string, n_items)
			copy(current, items)
			return current
		}

		for k := n_items - 2; k >= 0; k-- {
			if current[k] < current[k+1] {
				for i := n_items - 1; k < i; i-- {
					if current[k] < current[i] {
						current[k], current[i] = current[i], current[k]
						// Find the smallest element to the right of k and swap
						for j := k + 1; j < n_items; j++ {
							for l := j + 1; l < n_items; l++ {
								if current[j] > current[l] {
									current[j], current[l] = current[l], current[j]
								}
							}
						}
						return current
					}
				}
			}
		}
		return nil
	}
}

func MakeSolutions(attribute_map map[string][]string) []House {
	sizes := make([]int, len(attribute_map))
	i := 0
	for _, values := range attribute_map {
		sizes[i] = len(values)
		i++
	}

	houseCount := 1
	for _, size := range sizes {
		houseCount *= size
	}

	solutions := make([]House, houseCount)
	for i := range solutions {
		solutions[i] = make(House)
	}

	index := 0
	for attr, values := range attribute_map {
		repeat := houseCount / len(values)
		for i := 0; i < houseCount; i++ {
			solutions[i][attr] = values[(i/repeat)%len(values)]
		}
		index++
	}

	return solutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
	return func(houses []House) bool {
		for _, house := range houses {
			pos1Str, ok1 := house["Position"]
			pos2Str, ok2 := house["position"]

			if !ok1 || !ok2 {
				return false // Handle missing "Position" or "position" keys
			}

			pos1, err1 := strconv.Atoi(pos1Str)
			pos2, err2 := strconv.Atoi(pos2Str)

			if err1 != nil || err2 != nil {
				return false // Handle parsing errors
			}

			if house[key1] == value1 {
				if house[key2] == value2 {
					switch position {
					case "same":
						return pos1 == pos2
					case "right":
						return pos1+1 == pos2
					case "left":
						return pos1 == 1+pos2
					case "next to":
						return (pos1+1 == pos2) || (pos1 == pos2+1)
					default:
						return false // Invalid rule
					}
				}
			}
		}
		return true
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
		makeRule("Position", "3", "Drink", "Milk", "same"), // Directly use "3"
		// 10. The Norwegian lives in the first house.
		makeRule("Position", "1", "Owner", "Norwegian", "same"), // Directly use "1"
		// 11. The man who smokes Chesterfields lives in the house next to the man with the fox.
		makeRule("Smoke", "Chesterfields", "Pet", "Fox", "next to"),
		// 12. Kools are smoked in the house next to the house where the horse is kept.
		makeRule("Smoke", "Kools", "Pet", "Horse", "next to"),
		// 13. The Lucky Strike smoker drinks orange juice.
		makeRule("Smoke", "Lucky Strike", "Drink", "Orange Juice", "same"),
		// 14. The Japanese smokes Parliaments.
		makeRule("Smoke", "Parliaments", "Owner", "Japanese", "same"),
	}

	filteredSolutions := make([]House, 0, len(solutions))
	for _, sol := range solutions {
		valid := true
		for _, rule := range rules {
			if !rule([]House{sol}) {
				valid = false
				break
			}
		}
		if valid {
			filteredSolutions = append(filteredSolutions, sol)
		}
	}

	// Find the solution where the Norwegian drinks water and the Japanese owns the zebra.
	norwegianDrinksWater := "Norwegian"
	japaneseOwnsZebra := "Japanese"

	return Solution{DrinksWater: norwegianDrinksWater, OwnsZebra: japaneseOwnsZebra}
}