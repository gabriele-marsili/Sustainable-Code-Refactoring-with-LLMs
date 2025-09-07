package zebra

import (
	"strconv"
)

type House [6]string // Position, Owner, Pet, Drink, Smoke, Color
type Rule func([]House) bool

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

const (
	Position = 0
	Owner    = 1
	Pet      = 2
	Drink    = 3
	Smoke    = 4
	Color    = 5
)

var (
	owners = [5]string{"English", "Spanish", "Ukrainian", "Norwegian", "Japanese"}
	pets   = [5]string{"Dog", "Snail", "Fox", "Horse", "Zebra"}
	drinks = [5]string{"Water", "Milk", "Tea", "Orange Juice", "Coffee"}
	smokes = [5]string{"Kools", "Old Gold", "Chesterfields", "Lucky Strike", "Parliament"}
	colors = [5]string{"Red", "Green", "Ivory", "Yellow", "Blue"}
)

func nextPermutation(arr []int) bool {
	n := len(arr)
	k := n - 2
	for k >= 0 && arr[k] >= arr[k+1] {
		k--
	}
	if k < 0 {
		return false
	}
	
	i := n - 1
	for arr[k] >= arr[i] {
		i--
	}
	arr[k], arr[i] = arr[i], arr[k]
	
	for i, j := k+1, n-1; i < j; i, j = i+1, j-1 {
		arr[i], arr[j] = arr[j], arr[i]
	}
	return true
}

func makeRule(attr1 int, value1 string, attr2 int, value2 string, position string) Rule {
	return func(houses []House) bool {
		var pos1, pos2 int
		for i := 0; i < 5; i++ {
			if houses[i][attr1] == value1 {
				pos1 = i + 1
			}
			if houses[i][attr2] == value2 {
				pos2 = i + 1
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
			return (pos1+1 == pos2) || (pos1 == pos2+1)
		}
		return false
	}
}

func SolvePuzzle() Solution {
	rules := []Rule{
		makeRule(Owner, "English", Color, "Red", "same"),
		makeRule(Owner, "Spanish", Pet, "Dog", "same"),
		makeRule(Drink, "Coffee", Color, "Green", "same"),
		makeRule(Owner, "Ukrainian", Drink, "Tea", "same"),
		makeRule(Color, "Green", Color, "Ivory", "right"),
		makeRule(Smoke, "Old Gold", Pet, "Snail", "same"),
		makeRule(Smoke, "Kools", Color, "Yellow", "same"),
		func(houses []House) bool { return houses[2][Drink] == "Milk" },
		func(houses []House) bool { return houses[0][Owner] == "Norwegian" },
		makeRule(Smoke, "Chesterfields", Pet, "Fox", "next to"),
		makeRule(Smoke, "Kools", Pet, "Horse", "next to"),
		makeRule(Smoke, "Lucky Strike", Drink, "Orange Juice", "same"),
		makeRule(Owner, "Japanese", Smoke, "Parliament", "same"),
		makeRule(Owner, "Norwegian", Color, "Blue", "next to"),
	}

	ownerPerm := []int{0, 1, 2, 3, 4}
	petPerm := []int{0, 1, 2, 3, 4}
	drinkPerm := []int{0, 1, 2, 3, 4}
	smokePerm := []int{0, 1, 2, 3, 4}
	colorPerm := []int{0, 1, 2, 3, 4}

	houses := make([]House, 5)
	for i := 0; i < 5; i++ {
		houses[i][Position] = strconv.Itoa(i + 1)
	}

	for {
		for i := 0; i < 5; i++ {
			houses[i][Owner] = owners[ownerPerm[i]]
		}
		
		petPerm = []int{0, 1, 2, 3, 4}
		for {
			for i := 0; i < 5; i++ {
				houses[i][Pet] = pets[petPerm[i]]
			}
			
			drinkPerm = []int{0, 1, 2, 3, 4}
			for {
				for i := 0; i < 5; i++ {
					houses[i][Drink] = drinks[drinkPerm[i]]
				}
				
				smokePerm = []int{0, 1, 2, 3, 4}
				for {
					for i := 0; i < 5; i++ {
						houses[i][Smoke] = smokes[smokePerm[i]]
					}
					
					colorPerm = []int{0, 1, 2, 3, 4}
					for {
						for i := 0; i < 5; i++ {
							houses[i][Color] = colors[colorPerm[i]]
						}
						
						valid := true
						for _, rule := range rules {
							if !rule(houses) {
								valid = false
								break
							}
						}
						
						if valid {
							var waterDrinker, zebraOwner string
							for i := 0; i < 5; i++ {
								if houses[i][Drink] == "Water" {
									waterDrinker = houses[i][Owner]
								}
								if houses[i][Pet] == "Zebra" {
									zebraOwner = houses[i][Owner]
								}
							}
							return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
						}
						
						if !nextPermutation(colorPerm) {
							break
						}
					}
					
					if !nextPermutation(smokePerm) {
						break
					}
				}
				
				if !nextPermutation(drinkPerm) {
					break
				}
			}
			
			if !nextPermutation(petPerm) {
				break
			}
		}
		
		if !nextPermutation(ownerPerm) {
			break
		}
	}
	
	return Solution{}
}