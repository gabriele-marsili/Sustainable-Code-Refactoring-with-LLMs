package zebra

import (
	"sort"
	"strconv"
	"strings"
)

type House struct {
	Position string
	Owners   string
	Pets     string
	Drink    string
	Smokes   string
	Color    string
}

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
						sort.Sort(ByHash(current[k+1:]))
						return current
					}
				}
			}
		}
		return nil
	}
}

func MakeSolutions(attribute_map map[string][]string) [][]House {
	positions := []string{"1", "2", "3", "4", "5"}
	owners := attribute_map["Owners"]
	pets := attribute_map["Pets"]
	drinks := attribute_map["Drink"]
	smokes := attribute_map["Smokes"]
	colors := attribute_map["Color"]

	solutions := [][]House{}

	posGen := Permutations(positions)
	ownerGen := Permutations(owners)
	petGen := Permutations(pets)
	drinkGen := Permutations(drinks)
	smokeGen := Permutations(smokes)
	colorGen := Permutations(colors)

	for posPerm := posGen(); posPerm != nil; posPerm = posGen() {
		for ownerPerm := ownerGen(); ownerPerm != nil; ownerPerm = ownerGen() {
			for petPerm := petGen(); petPerm != nil; petPerm = petGen() {
				for drinkPerm := drinkGen(); drinkPerm != nil; drinkPerm = drinkGen() {
					for smokePerm := smokeGen(); smokePerm != nil; smokePerm = smokeGen() {
						for colorPerm := colorGen(); colorPerm != nil; colorPerm = colorGen() {
							houses := make([]House, 5)
							for i := 0; i < 5; i++ {
								houses[i] = House{
									Position: posPerm[i],
									Owners:   ownerPerm[i],
									Pets:     petPerm[i],
									Drink:    drinkPerm[i],
									Smokes:   smokePerm[i],
									Color:    colorPerm[i],
								}
							}
							solutions = append(solutions, houses)
						}
					}
				}
			}
		}
	}

	return solutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
	return func(houses []House) bool {
		pos1 := -1
		pos2 := -1
		for i, house := range houses {
			if house.Owners == value1 && key1 == "Owner" {
				pos1 = i
			} else if house.Pets == value1 && key1 == "Pet" {
				pos1 = i
			} else if house.Drink == value1 && key1 == "Drink" {
				pos1 = i
			} else if house.Smokes == value1 && key1 == "Smoke" {
				pos1 = i
			} else if house.Color == value1 && key1 == "Color" {
				pos1 = i
			} else if house.Position == value1 && key1 == "Position" {
				pos1 = i
			}

			if house.Owners == value2 && key2 == "Owner" {
				pos2 = i
			} else if house.Pets == value2 && key2 == "Pet" {
				pos2 = i
			} else if house.Drink == value2 && key2 == "Drink" {
				pos2 = i
			} else if house.Smokes == value2 && key2 == "Smoke" {
				pos2 = i
			} else if house.Color == value2 && key2 == "Color" {
				pos2 = i
			} else if house.Position == value2 && key2 == "Position" {
				pos2 = i
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
		}
		return false
	}
}

func SolvePuzzle() Solution {
	values := map[string][]string{
		"Position": strings.Split("1,2,3,4,5", ","),
		"Owners":   strings.Split("English,Spanish,Ukrainian,Norwegian,Japanese", ","),
		"Pets":     strings.Split("Dog,Snail,Fox,Horse,Zebra", ","),
		"Drink":    strings.Split("Water,Milk,Tea,Orange Juice,Coffee", ","),
		"Smokes":   strings.Split("Kools,Old Gold,Chesterfields,Lucky Strike,Parliament", ","),
		"Color":    strings.Split("Red,Green,Ivory,Yellow,Blue", ","),
	}

	solutions := MakeSolutions(values)
	rules := [](Rule){
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
		makeRule("Smoke", "Parliament", "Owner", "Japanese", "same"),
	}

	filteredSolutions := make([][]House, 0, len(solutions))
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

	for _, sol := range filteredSolutions {
		for _, house := range sol {
			if house.Drink == "Water" {
				waterDrinker = house.Owners
			}
			if house.Pets == "Zebra" {
				zebraOwner = house.Owners
			}
		}
	}

	return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
}