package foodchain

import (
	"fmt"
	"strings"
)

var (
	firstLines = []string{
		"", // Placeholder for index 0
		"I know an old lady who swallowed a fly.",
		"I know an old lady who swallowed a spider.",
		"I know an old lady who swallowed a bird.",
		"I know an old lady who swallowed a cat.",
		"I know an old lady who swallowed a dog.",
		"I know an old lady who swallowed a goat.",
		"I know an old lady who swallowed a cow.",
		"I know an old lady who swallowed a horse.",
	}

	middleLines = [][]string{
		{}, // Placeholder for index 0
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
		{},
	}

	catchLines = []string{
		"", // Placeholder for index 0
		"",
		"",
		"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.",
		"She swallowed the cat to catch the bird.",
		"She swallowed the dog to catch the cat.",
		"She swallowed the goat to catch the dog.",
		"She swallowed the cow to catch the goat.",
	}

	lastLines = []string{
		"", // Placeholder for index 0
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"She's dead, of course!",
	}
)

func Verse(verseNumber int) string {
	var sb strings.Builder
	sb.WriteString(firstLines[verseNumber])
	sb.WriteString("\n")

	for _, line := range middleLines[verseNumber] {
		sb.WriteString(line)
		sb.WriteString("\n")
	}

	if verseNumber > 2 && verseNumber <= 7 {
		for i := verseNumber; i > 2; i-- {
			sb.WriteString(catchLines[i])
			sb.WriteString("\n")
		}
	}

	sb.WriteString(lastLines[verseNumber])

	return sb.String()
}

func Verses(start, end int) string {
	var sb strings.Builder
	for i := start; i <= end; i++ {
		sb.WriteString(Verse(i))
		if i < end {
			sb.WriteString("\n\n")
		}
	}
	return sb.String()
}

func Song() string {
	return Verses(1, 8)
}