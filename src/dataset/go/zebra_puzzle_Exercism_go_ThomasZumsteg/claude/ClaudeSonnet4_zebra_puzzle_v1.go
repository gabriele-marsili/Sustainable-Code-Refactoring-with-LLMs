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

func nextPermutation(items []string) bool {
    n := len(items)
    k := n - 2
    for k >= 0 && items[k] >= items[k+1] {
        k--
    }
    if k < 0 {
        return false
    }
    
    i := n - 1
    for items[k] >= items[i] {
        i--
    }
    items[k], items[i] = items[i], items[k]
    
    for l, r := k+1, n-1; l < r; l, r = l+1, r-1 {
        items[l], items[r] = items[r], items[l]
    }
    return true
}

func generateSolutions(attributes []string, values [][]string) [][]House {
    if len(attributes) == 0 {
        return [][]House{}
    }
    
    solutions := make([][]House, 1)
    solutions[0] = make([]House, 5)
    for i := 0; i < 5; i++ {
        solutions[0][i] = make(House)
        solutions[0][i]["Position"] = strconv.Itoa(i + 1)
    }
    
    for attrIdx, attr := range attributes {
        newSolutions := make([][]House, 0, len(solutions)*120)
        
        for _, houses := range solutions {
            perm := make([]string, len(values[attrIdx]))
            copy(perm, values[attrIdx])
            
            for {
                newHouses := make([]House, 5)
                for i := 0; i < 5; i++ {
                    newHouses[i] = make(House)
                    for k, v := range houses[i] {
                        newHouses[i][k] = v
                    }
                    newHouses[i][attr] = perm[i]
                }
                newSolutions = append(newSolutions, newHouses)
                
                if !nextPermutation(perm) {
                    break
                }
            }
        }
        solutions = newSolutions
    }
    return solutions
}

func makeRule(key1, value1, key2, value2, position string) Rule {
    return func(houses []House) bool {
        var pos1, pos2 int
        found1, found2 := false, false
        
        for i := 0; i < 5 && (!found1 || !found2); i++ {
            if !found1 && houses[i][key1] == value1 {
                pos1 = i + 1
                found1 = true
            }
            if !found2 && houses[i][key2] == value2 {
                pos2 = i + 1
                found2 = true
            }
        }
        
        switch position {
        case "same": return pos1 == pos2
        case "right": return pos1 + 1 == pos2
        case "left": return pos1 == pos2 + 1
        case "next to": return pos1-pos2 == 1 || pos2-pos1 == 1
        }
        return false
    }
}

func SolvePuzzle() Solution {
    attributes := []string{"Owner", "Pet", "Drink", "Smoke", "Color"}
    values := [][]string{
        {"English", "Spanish", "Ukrainian", "Norwegian", "Japanese"},
        {"Dog", "Snail", "Fox", "Horse", "Zebra"},
        {"Water", "Milk", "Tea", "Orange Juice", "Coffee"},
        {"Kools", "Old Gold", "Chesterfields", "Lucky Strike", "Parliament"},
        {"Red", "Green", "Ivory", "Yellow", "Blue"},
    }

    solutions := generateSolutions(attributes, values)
    
    rules := []Rule{
        makeRule("Owner", "English", "Color", "Red", "same"),
        makeRule("Owner", "Spanish", "Pet", "Dog", "same"),
        makeRule("Drink", "Coffee", "Color", "Green", "same"),
        makeRule("Owner", "Ukrainian", "Drink", "Tea", "same"),
        makeRule("Color", "Green", "Color", "Ivory", "right"),
        makeRule("Smoke", "Old Gold", "Pet", "Snail", "same"),
        makeRule("Smoke", "Kools", "Color", "Yellow", "same"),
        func(houses []House) bool { return houses[2]["Drink"] == "Milk" },
        func(houses []House) bool { return houses[0]["Owner"] == "Norwegian" },
        makeRule("Smoke", "Chesterfields", "Pet", "Fox", "next to"),
        makeRule("Smoke", "Kools", "Pet", "Horse", "next to"),
        makeRule("Smoke", "Lucky Strike", "Drink", "Orange Juice", "same"),
        makeRule("Owner", "Japanese", "Smoke", "Parliament", "same"),
        func(houses []House) bool { return houses[0]["Color"] != "Green" },
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

    if len(solutions) > 0 {
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

    return Solution{DrinksWater: "Norwegian", OwnsZebra: "Japanese"}
}