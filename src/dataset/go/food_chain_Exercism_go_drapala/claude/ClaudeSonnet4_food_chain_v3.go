package foodchain

import (
	"fmt"
	"strings"
)

type verse struct {
	currentAnimal    string
	comment          string
	previousAnimals  []string
}

var verses = [9]verse{
	{}, // index 0 unused
	{
		currentAnimal:   "fly",
		comment:         "",
		previousAnimals: nil,
	},
	{
		currentAnimal:   "spider",
		comment:         "It wriggled and jiggled and tickled inside her.",
		previousAnimals: []string{"spider", "fly"},
	},
	{
		currentAnimal:   "bird",
		comment:         "How absurd to swallow a bird!",
		previousAnimals: []string{"bird", "spider", "fly"},
	},
	{
		currentAnimal:   "cat",
		comment:         "Imagine that, to swallow a cat!",
		previousAnimals: []string{"cat", "bird", "spider", "fly"},
	},
	{
		currentAnimal:   "dog",
		comment:         "What a hog, to swallow a dog!",
		previousAnimals: []string{"dog", "cat", "bird", "spider", "fly"},
	},
	{
		currentAnimal:   "goat",
		comment:         "Just opened her throat and swallowed a goat!",
		previousAnimals: []string{"goat", "dog", "cat", "bird", "spider", "fly"},
	},
	{
		currentAnimal:   "cow",
		comment:         "I don't know how she swallowed a cow!",
		previousAnimals: []string{"cow", "goat", "dog", "cat", "bird", "spider", "fly"},
	},
	{
		currentAnimal:   "horse",
		comment:         "She's dead, of course!",
		previousAnimals: nil,
	},
}

const (
	firstLine = "I know an old lady who swallowed a %s."
	catchLine = "\nShe swallowed the %s to catch the %s."
	spiderLine = "\nShe swallowed the %s to catch the %s that wriggled and jiggled and tickled inside her."
	finalLine = "I don't know why she swallowed the fly. Perhaps she'll die."
)

func NarratePreviousAnimals(verse_n verse) string {
	if len(verse_n.previousAnimals) == 0 {
		return ""
	}

	var builder strings.Builder
	builder.Grow(200) // Pre-allocate reasonable capacity

	for i := 1; i < len(verse_n.previousAnimals); i++ {
		if verse_n.previousAnimals[i] == "spider" {
			builder.WriteString(fmt.Sprintf(spiderLine, verse_n.previousAnimals[i-1], verse_n.previousAnimals[i]))
		} else {
			builder.WriteString(fmt.Sprintf(catchLine, verse_n.previousAnimals[i-1], verse_n.previousAnimals[i]))
		}
	}
	builder.WriteByte('\n')
	return builder.String()
}

func Verse(v int) string {
	verse_n := verses[v]
	
	var builder strings.Builder
	builder.Grow(300) // Pre-allocate reasonable capacity
	
	builder.WriteString(fmt.Sprintf(firstLine, verse_n.currentAnimal))
	builder.WriteByte('\n')
	builder.WriteString(verse_n.comment)
	builder.WriteString(NarratePreviousAnimals(verse_n))
	
	if v != 8 {
		builder.WriteString(finalLine)
	}
	
	return builder.String()
}

func Verses(start, end int) string {
	var builder strings.Builder
	builder.Grow((end - start + 1) * 400) // Pre-allocate based on expected size
	
	for v := start; v <= end; v++ {
		if v > start {
			builder.WriteString("\n\n")
		}
		builder.WriteString(Verse(v))
	}
	
	return builder.String()
}

func Song() string {
	return Verses(1, 8)
}