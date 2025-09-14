package foodchain

import (
	"fmt"
	"strings"
)

var animals = [9]string{"", "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"}

var exclamations = [9]string{
	"",
	"",
	"It wriggled and jiggled and tickled inside her.",
	"How absurd to swallow a bird!",
	"Imagine that, to swallow a cat!",
	"What a hog, to swallow a dog!",
	"Just opened her throat and swallowed a goat!",
	"I don't know how she swallowed a cow!",
	"",
}

var catchLines = [8]string{
	"",
	"She swallowed the spider to catch the fly.",
	"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.",
	"She swallowed the cat to catch the bird.",
	"She swallowed the dog to catch the cat.",
	"She swallowed the goat to catch the dog.",
	"She swallowed the cow to catch the goat.",
	"",
}

const lastLineDefault = "I don't know why she swallowed the fly. Perhaps she'll die."
const lastLineHorse = "She's dead, of course!"

func Verse(verseNumber int) string {
	var builder strings.Builder
	builder.WriteString(firstLine(verseNumber))
	
	if middle := middleLines(verseNumber); len(middle) > 0 {
		builder.WriteByte('\n')
		builder.WriteString(strings.Join(middle, "\n"))
	}
	
	builder.WriteByte('\n')
	builder.WriteString(lastLine(verseNumber))
	
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
	return fmt.Sprintf("I know an old lady who swallowed a %s.", animals[verseNumber])
}

func startingAnimal(verseNumber int) string {
	return animals[verseNumber]
}

func middleLines(verseNumber int) []string {
	if verseNumber <= 1 || verseNumber == 8 {
		return nil
	}
	
	lines := make([]string, 0, verseNumber)
	
	if exclamations[verseNumber] != "" {
		lines = append(lines, exclamations[verseNumber])
	}
	
	for i := verseNumber; i >= 2; i-- {
		lines = append(lines, catchLines[i-1])
	}
	
	return lines
}

func lastLine(verseNumber int) string {
	if verseNumber == 8 {
		return lastLineHorse
	}
	return lastLineDefault
}