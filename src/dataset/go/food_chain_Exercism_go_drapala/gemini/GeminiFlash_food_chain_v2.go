package foodchain

import (
	"fmt"
	"strings"
)

type verse struct {
	animal  string
	comment string
	catches string
}

var verses = []verse{
	{animal: "fly", comment: ""},
	{animal: "spider", comment: "It wriggled and jiggled and tickled inside her.", catches: "fly"},
	{animal: "bird", comment: "How absurd to swallow a bird!", catches: "spider"},
	{animal: "cat", comment: "Imagine that, to swallow a cat!", catches: "bird"},
	{animal: "dog", comment: "What a hog, to swallow a dog!", catches: "cat"},
	{animal: "goat", comment: "Just opened her throat and swallowed a goat!", catches: "dog"},
	{animal: "cow", comment: "I don't know how she swallowed a cow!", catches: "goat"},
	{animal: "horse", comment: "She's dead, of course!"},
}

func Verse(v int) string {
	verse := verses[v-1]
	result := fmt.Sprintf("I know an old lady who swallowed a %s.\n%s", verse.animal, verse.comment)

	if v == 1 {
		if verse.comment != "" {
			result += "\n"
		}
		return result
	}

	if v == 8 {
		return result
	}

	for i := v - 1; i > 1; i-- {
		current := verses[i]
		previous := verses[i-1]
		if current.animal == "spider" {
			result += fmt.Sprintf("\nShe swallowed the %s to catch the %s that wriggled and jiggled and tickled inside her.", previous.animal, current.animal)
		} else {
			result += fmt.Sprintf("\nShe swallowed the %s to catch the %s.", previous.animal, current.animal)
		}
	}

	result += fmt.Sprintf("\nShe swallowed the %s to catch the %s.", verses[0].animal, verses[1].animal)
	result += "\nI don't know why she swallowed the fly. Perhaps she'll die."

	return result
}

func Verses(start, end int) string {
	var result strings.Builder
	for i := start; i <= end; i++ {
		result.WriteString(Verse(i))
		if i < end {
			result.WriteString("\n\n")
		}
	}
	return result.String()
}

func Song() string {
	return Verses(1, 8)
}