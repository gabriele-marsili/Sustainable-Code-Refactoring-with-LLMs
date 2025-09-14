package foodchain

import (
	"strings"
)

type verse struct {
	current_animal   string
	comment          string
	previous_animals []string
}

var verses = [9]verse{
	{}, // index 0 unused
	{
		current_animal:   "fly",
		comment:          "",
		previous_animals: nil,
	},
	{
		current_animal:   "spider",
		comment:          "It wriggled and jiggled and tickled inside her.",
		previous_animals: []string{"spider", "fly"},
	},
	{
		current_animal:   "bird",
		comment:          "How absurd to swallow a bird!",
		previous_animals: []string{"bird", "spider", "fly"},
	},
	{
		current_animal:   "cat",
		comment:          "Imagine that, to swallow a cat!",
		previous_animals: []string{"cat", "bird", "spider", "fly"},
	},
	{
		current_animal:   "dog",
		comment:          "What a hog, to swallow a dog!",
		previous_animals: []string{"dog", "cat", "bird", "spider", "fly"},
	},
	{
		current_animal:   "goat",
		comment:          "Just opened her throat and swallowed a goat!",
		previous_animals: []string{"goat", "dog", "cat", "bird", "spider", "fly"},
	},
	{
		current_animal:   "cow",
		comment:          "I don't know how she swallowed a cow!",
		previous_animals: []string{"cow", "goat", "dog", "cat", "bird", "spider", "fly"},
	},
	{
		current_animal:   "horse",
		comment:          "She's dead, of course!",
		previous_animals: nil,
	},
}

const spiderSuffix = " that wriggled and jiggled and tickled inside her."
const staticEnding = "I don't know why she swallowed the fly. Perhaps she'll die."

func NarratePreviousAnimals(verse_n verse) string {
	if len(verse_n.previous_animals) == 0 {
		return ""
	}

	var builder strings.Builder
	builder.Grow(200) // Pre-allocate reasonable capacity

	for i := 1; i < len(verse_n.previous_animals); i++ {
		builder.WriteString("\nShe swallowed the ")
		builder.WriteString(verse_n.previous_animals[i-1])
		builder.WriteString(" to catch the ")
		builder.WriteString(verse_n.previous_animals[i])
		if verse_n.previous_animals[i] == "spider" {
			builder.WriteString(spiderSuffix)
		} else {
			builder.WriteByte('.')
		}
	}
	builder.WriteByte('\n')
	return builder.String()
}

func Verse(v int) string {
	verse_n := verses[v]
	
	var builder strings.Builder
	builder.Grow(300) // Pre-allocate reasonable capacity
	
	builder.WriteString("I know an old lady who swallowed a ")
	builder.WriteString(verse_n.current_animal)
	builder.WriteByte('.')
	
	if verse_n.comment != "" {
		builder.WriteByte('\n')
		builder.WriteString(verse_n.comment)
	}
	
	builder.WriteString(NarratePreviousAnimals(verse_n))
	
	if v != 8 {
		builder.WriteString(staticEnding)
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