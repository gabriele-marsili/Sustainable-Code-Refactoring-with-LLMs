package dndcharacter

import (
	"math"
	"math/rand"
	"sort"
)

type Character struct {
	Strength     int
	Dexterity    int
	Constitution int
	Intelligence int
	Wisdom       int
	Charisma     int
	Hitpoints    int
}

// Modifier calculates the ability modifier for a given ability score
func Modifier(score int) int {
	return (score - 10) / 2
}

// Ability uses randomness to generate the score for an ability
func Ability() int {
	rolls := make([]int, 4)
	for i := 0; i < 4; i++ {
		rolls[i] = rollDice()
	}
	sort.Ints(rolls)
	return rolls[1] + rolls[2] + rolls[3]
}

// GenerateCharacter creates a new Character with random scores for abilities
func GenerateCharacter() Character {
	abilities := [6]int{}
	for i := 0; i < 6; i++ {
		abilities[i] = Ability()
	}

	return Character{
		Strength:     abilities[0],
		Dexterity:    abilities[1],
		Constitution: abilities[2],
		Intelligence: abilities[3],
		Wisdom:       abilities[4],
		Charisma:     abilities[5],
		Hitpoints:    10 + Modifier(abilities[2]),
	}
}

// rollDice returns a random number between 1 and 6.
func rollDice() int {
	return rand.Intn(6) + 1
}