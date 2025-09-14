package foodchain

import (
	"strings"
)

var animals = []string{"", "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"}
var comments = []string{"", "", "It wriggled and jiggled and tickled inside her.", "How absurd to swallow a bird!", "Imagine that, to swallow a cat!", "What a hog, to swallow a dog!", "Just opened her throat and swallowed a goat!", "I don't know how she swallowed a cow!", "She's dead, of course!"}

const spiderText = " that wriggled and jiggled and tickled inside her"
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
			builder.WriteString(spiderText)
		}
		builder.WriteByte('.')
	}
	builder.WriteByte('\n')
	return builder.String()
}

type verse struct {
	current_animal   string
	comment          string
	previous_animals []string
}

func Verse(v int) string {
	if v == 8 {
		return "I know an old lady who swallowed a horse.\nShe's dead, of course!"
	}
	
	var builder strings.Builder
	builder.Grow(300) // Pre-allocate reasonable capacity
	
	// First line
	builder.WriteString("I know an old lady who swallowed a ")
	builder.WriteString(animals[v])
	builder.WriteByte('.')
	
	// Comment
	if comments[v] != "" {
		builder.WriteByte('\n')
		builder.WriteString(comments[v])
	}
	
	// Previous animals
	if v > 1 {
		for i := v; i > 1; i-- {
			builder.WriteString("\nShe swallowed the ")
			builder.WriteString(animals[i])
			builder.WriteString(" to catch the ")
			builder.WriteString(animals[i-1])
			if animals[i-1] == "spider" {
				builder.WriteString(spiderText)
			}
			builder.WriteByte('.')
		}
		builder.WriteByte('\n')
	}
	
	// Static ending
	builder.WriteString(staticEnding)
	
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