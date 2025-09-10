package foodchain

import (
	"fmt"
	"strings"
)

type verse struct {
	animal  string
	comment string
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

var catchPhrases = map[string]string{
	"spider": "It wriggled and jiggled and tickled inside her.",
}

func verseText(n int) string {
	v := verses[n-1]
	text := fmt.Sprintf("I know an old lady who swallowed a %s.\n", v.animal)
	if v.comment != "" {
		text += v.comment + "\n"
	}

	if n > 1 && n <= 7 {
		for i := n - 1; i > 0; i-- {
			animal1 := verses[i].animal
			animal2 := verses[i-1].animal
			phrase, ok := catchPhrases[animal2]
			if ok {
				text += fmt.Sprintf("She swallowed the %s to catch the %s that %s.\n", animal1, animal2, phrase)
			} else {
				text += fmt.Sprintf("She swallowed the %s to catch the %s.\n", animal1, animal2)
			}
		}
		text += "I don't know why she swallowed the fly. Perhaps she'll die."
	}

	return text
}

func Verse(v int) string {
	return verseText(v)
}

func Verses(start, end int) string {
	var result strings.Builder
	for i := start; i <= end; i++ {
		result.WriteString(verseText(i))
		if i < end {
			result.WriteString("\n\n")
		}
	}
	return result.String()
}

func Song() string {
	return Verses(1, 8)
}