package foodchain

import (
	"fmt"
	"strings"
)

var verseNumberToStartingAnimal = [...]string{
	"", "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse",
}

var verseNumberToMiddleLines = map[int][]string{
	2: {
		"It wriggled and jiggled and tickled inside her.",
		"She swallowed the spider to catch the fly.",
	},
	3: {
		"How absurd to swallow a bird!",
		"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.",
	},
	4: {
		"Imagine that, to swallow a cat!",
		"She swallowed the cat to catch the bird.",
	},
	5: {
		"What a hog, to swallow a dog!",
		"She swallowed the dog to catch the cat.",
	},
	6: {
		"Just opened her throat and swallowed a goat!",
		"She swallowed the goat to catch the dog.",
	},
	7: {
		"I don't know how she swallowed a cow!",
		"She swallowed the cow to catch the goat.",
	},
}

func Verse(verseNumber int) string {
	lines := make([]string, 0, 5)
	lines = append(lines, firstLine(verseNumber))
	lines = append(lines, middleLines(verseNumber)...)
	lines = append(lines, lastLine(verseNumber))
	return strings.Join(lines, "\n")
}

func Verses(start, end int) string {
	verses := make([]string, 0, end-start+1)
	for i := start; i <= end; i++ {
		verses = append(verses, Verse(i))
	}
	return strings.Join(verses, "\n\n")
}

func Song() string {
	return Verses(1, 8)
}

func firstLine(verseNumber int) string {
	return fmt.Sprintf("I know an old lady who swallowed a %v.", startingAnimal(verseNumber))
}

func startingAnimal(verseNumber int) string {
	return verseNumberToStartingAnimal[verseNumber]
}

func middleLines(verseNumber int) []string {
	switch {
	case verseNumber <= 1, verseNumber == 8:
		return nil
	case verseNumber == 2:
		return verseNumberToMiddleLines[verseNumber]
	case verseNumber >= 3 && verseNumber <= 7:
		lines := append([]string(nil), verseNumberToMiddleLines[verseNumber]...)
		prev := middleLines(verseNumber - 1)
		if len(prev) > 1 {
			lines = append(lines, prev[1:]...)
		}
		return lines
	default:
		panic(fmt.Sprintf("unsupported verseNumber %v", verseNumber))
	}
}

func lastLine(verseNumber int) string {
	if verseNumber == 8 {
		return "She's dead, of course!"
	}
	return "I don't know why she swallowed the fly. Perhaps she'll die."
}
