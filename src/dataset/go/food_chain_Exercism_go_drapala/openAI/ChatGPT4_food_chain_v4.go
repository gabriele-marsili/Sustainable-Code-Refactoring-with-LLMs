package foodchain

import (
	"strings"
)

type verse struct {
	currentAnimal   string
	comment         string
	previousAnimals []string
}

var verses = []verse{
	{currentAnimal: "fly", comment: "", previousAnimals: nil},
	{currentAnimal: "spider", comment: "It wriggled and jiggled and tickled inside her.", previousAnimals: []string{"spider", "fly"}},
	{currentAnimal: "bird", comment: "How absurd to swallow a bird!", previousAnimals: []string{"bird", "spider", "fly"}},
	{currentAnimal: "cat", comment: "Imagine that, to swallow a cat!", previousAnimals: []string{"cat", "bird", "spider", "fly"}},
	{currentAnimal: "dog", comment: "What a hog, to swallow a dog!", previousAnimals: []string{"dog", "cat", "bird", "spider", "fly"}},
	{currentAnimal: "goat", comment: "Just opened her throat and swallowed a goat!", previousAnimals: []string{"goat", "dog", "cat", "bird", "spider", "fly"}},
	{currentAnimal: "cow", comment: "I don't know how she swallowed a cow!", previousAnimals: []string{"cow", "goat", "dog", "cat", "bird", "spider", "fly"}},
	{currentAnimal: "horse", comment: "She's dead, of course!", previousAnimals: nil},
}

func narratePreviousAnimals(previousAnimals []string) string {
	if len(previousAnimals) == 0 {
		return ""
	}
	var sb strings.Builder
	for i := 1; i < len(previousAnimals); i++ {
		if previousAnimals[i] == "spider" {
			sb.WriteString("\nShe swallowed the " + previousAnimals[i-1] + " to catch the " + previousAnimals[i] + " that wriggled and jiggled and tickled inside her.")
		} else {
			sb.WriteString("\nShe swallowed the " + previousAnimals[i-1] + " to catch the " + previousAnimals[i] + ".")
		}
	}
	sb.WriteString("\n")
	return sb.String()
}

func Verse(v int) string {
	verse := verses[v-1]
	var sb strings.Builder
	sb.WriteString("I know an old lady who swallowed a " + verse.currentAnimal + ".")
	if verse.comment != "" {
		sb.WriteString("\n" + verse.comment)
	}
	sb.WriteString(narratePreviousAnimals(verse.previousAnimals))
	if v != 8 {
		sb.WriteString("I don't know why she swallowed the fly. Perhaps she'll die.")
	}
	return sb.String()
}

func Verses(start, end int) string {
	var sb strings.Builder
	for v := start; v <= end; v++ {
		if v > start {
			sb.WriteString("\n\n")
		}
		sb.WriteString(Verse(v))
	}
	return sb.String()
}

func Song() string {
	return Verses(1, 8)
}