package foodchain

import (
	"fmt"
	"strings"
)

type verse struct {
	currentAnimal string
	comment       string
}

var verses = []verse{
	{"fly", ""},
	{"spider", "It wriggled and jiggled and tickled inside her."},
	{"bird", "How absurd to swallow a bird!"},
	{"cat", "Imagine that, to swallow a cat!"},
	{"dog", "What a hog, to swallow a dog!"},
	{"goat", "Just opened her throat and swallowed a goat!"},
	{"cow", "I don't know how she swallowed a cow!"},
	{"horse", "She's dead, of course!"},
}

func narratePreviousAnimals(v int) string {
	if v == 0 || v == len(verses)-1 {
		return ""
	}

	var sb strings.Builder
	for i := v; i > 0; i-- {
		if verses[i-1].currentAnimal == "spider" {
			sb.WriteString(fmt.Sprintf("\nShe swallowed the %s to catch the %s that wriggled and jiggled and tickled inside her.", verses[i].currentAnimal, verses[i-1].currentAnimal))
		} else {
			sb.WriteString(fmt.Sprintf("\nShe swallowed the %s to catch the %s.", verses[i].currentAnimal, verses[i-1].currentAnimal))
		}
	}
	return sb.String()
}

func Verse(v int) string {
	v-- // Adjust for 0-based index
	var sb strings.Builder

	sb.WriteString(fmt.Sprintf("I know an old lady who swallowed a %s.", verses[v].currentAnimal))
	if verses[v].comment != "" {
		sb.WriteString(fmt.Sprintf("\n%s", verses[v].comment))
	}

	sb.WriteString(narratePreviousAnimals(v))

	if v != len(verses)-1 {
		sb.WriteString("\nI don't know why she swallowed the fly. Perhaps she'll die.")
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
	return Verses(1, len(verses))
}