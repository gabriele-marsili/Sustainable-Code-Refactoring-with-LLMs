package foodchain

import (
	"fmt"
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

func NarratePreviousAnimals(previousAnimals []string) string {
	if len(previousAnimals) == 0 {
		return ""
	}
	var sb strings.Builder
	for i := 1; i < len(previousAnimals); i++ {
		if previousAnimals[i] == "spider" {
			sb.WriteString(fmt.Sprintf("\nShe swallowed the %s to catch the %s that wriggled and jiggled and tickled inside her.", previousAnimals[i-1], previousAnimals[i]))
		} else {
			sb.WriteString(fmt.Sprintf("\nShe swallowed the %s to catch the %s.", previousAnimals[i-1], previousAnimals[i]))
		}
	}
	return sb.String() + "\n"
}

func Verse(v int) string {
	if v < 1 || v > len(verses) {
		return ""
	}
	verse := verses[v-1]
	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("I know an old lady who swallowed a %s.", verse.currentAnimal))
	if verse.comment != "" {
		sb.WriteString(fmt.Sprintf("\n%s", verse.comment))
	}
	sb.WriteString(NarratePreviousAnimals(verse.previousAnimals))
	if v != len(verses) {
		sb.WriteString("I don't know why she swallowed the fly. Perhaps she'll die.")
	}
	return sb.String()
}

func Verses(start, end int) string {
	if start < 1 || end > len(verses) || start > end {
		return ""
	}
	var sb strings.Builder
	for v := start; v <= end; v++ {
		sb.WriteString(Verse(v))
		if v != end {
			sb.WriteString("\n\n")
		}
	}
	return sb.String()
}

func Song() string {
	return Verses(1, len(verses))
}