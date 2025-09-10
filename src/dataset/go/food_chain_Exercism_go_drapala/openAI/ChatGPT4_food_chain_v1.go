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

func NarratePreviousAnimals(verseN verse) string {
	if len(verseN.previousAnimals) == 0 {
		return ""
	}

	var sb strings.Builder
	for i := 1; i < len(verseN.previousAnimals); i++ {
		if verseN.previousAnimals[i] == "spider" {
			sb.WriteString(fmt.Sprintf("\nShe swallowed the %s to catch the %s that wriggled and jiggled and tickled inside her.", verseN.previousAnimals[i-1], verseN.previousAnimals[i]))
		} else {
			sb.WriteString(fmt.Sprintf("\nShe swallowed the %s to catch the %s.", verseN.previousAnimals[i-1], verseN.previousAnimals[i]))
		}
	}
	sb.WriteString("\n")
	return sb.String()
}

func Verse(v int) string {
	verseN := verses[v-1]

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("I know an old lady who swallowed a %s.", verseN.currentAnimal))
	if verseN.comment != "" {
		sb.WriteString(fmt.Sprintf("\n%s", verseN.comment))
	}
	sb.WriteString(NarratePreviousAnimals(verseN))
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