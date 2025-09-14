package foodchain

import (
	"strings"
)

var animals = [9]string{"", "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"}

var middleLineTemplates = [8][]string{
	{},
	{},
	{
		"It wriggled and jiggled and tickled inside her.",
		"She swallowed the spider to catch the fly.",
	},
	{
		"How absurd to swallow a bird!",
		"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.",
	},
	{
		"Imagine that, to swallow a cat!",
		"She swallowed the cat to catch the bird.",
	},
	{
		"What a hog, to swallow a dog!",
		"She swallowed the dog to catch the cat.",
	},
	{
		"Just opened her throat and swallowed a goat!",
		"She swallowed the goat to catch the dog.",
	},
	{
		"I don't know how she swallowed a cow!",
		"She swallowed the cow to catch the goat.",
	},
}

var precomputedMiddleLines [8][]string

func init() {
	precomputedMiddleLines[0] = []string{}
	precomputedMiddleLines[1] = []string{}
	precomputedMiddleLines[2] = middleLineTemplates[2]
	
	for i := 3; i <= 7; i++ {
		lines := make([]string, 0, len(middleLineTemplates[i])+len(precomputedMiddleLines[i-1])-1)
		lines = append(lines, middleLineTemplates[i]...)
		if len(precomputedMiddleLines[i-1]) > 1 {
			lines = append(lines, precomputedMiddleLines[i-1][1:]...)
		}
		precomputedMiddleLines[i] = lines
	}
}

func Verse(verseNumber int) string {
	var builder strings.Builder
	
	builder.WriteString("I know an old lady who swallowed a ")
	builder.WriteString(animals[verseNumber])
	builder.WriteString(".")
	
	if verseNumber >= 2 && verseNumber <= 7 {
		for _, line := range precomputedMiddleLines[verseNumber] {
			builder.WriteString("\n")
			builder.WriteString(line)
		}
	}
	
	builder.WriteString("\n")
	if verseNumber == 8 {
		builder.WriteString("She's dead, of course!")
	} else {
		builder.WriteString("I don't know why she swallowed the fly. Perhaps she'll die.")
	}
	
	return builder.String()
}

func Verses(start, end int) string {
	var builder strings.Builder
	
	for i := start; i <= end; i++ {
		if i > start {
			builder.WriteString("\n\n")
		}
		builder.WriteString(Verse(i))
	}
	
	return builder.String()
}

func Song() string {
	return Verses(1, 8)
}

func firstLine(verseNumber int) string {
	var builder strings.Builder
	builder.WriteString("I know an old lady who swallowed a ")
	builder.WriteString(animals[verseNumber])
	builder.WriteString(".")
	return builder.String()
}

func startingAnimal(verseNumber int) string {
	return animals[verseNumber]
}

func middleLines(verseNumber int) []string {
	if verseNumber <= 1 || verseNumber == 8 {
		return []string{}
	}
	return precomputedMiddleLines[verseNumber]
}

func lastLine(verseNumber int) string {
	if verseNumber == 8 {
		return "She's dead, of course!"
	}
	return "I don't know why she swallowed the fly. Perhaps she'll die."
}