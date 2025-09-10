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

var catchPhrases = []string{
	"",
	"She swallowed the spider to catch the fly that wriggled and jiggled and tickled inside her.",
	"She swallowed the bird to catch the spider.",
	"She swallowed the cat to catch the bird.",
	"She swallowed the dog to catch the cat.",
	"She swallowed the goat to catch the dog.",
	"She swallowed the cow to catch the goat.",
}

func Verse(v int) string {
	v--
	if v < 0 || v >= len(verses) {
		return ""
	}

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("I know an old lady who swallowed a %s.\n", verses[v].animal))
	sb.WriteString(verses[v].comment)

	if v < len(catchPhrases) && v > 0 {
		for i := v; i > 0; i-- {
			sb.WriteString(fmt.Sprintf("\n%s", catchPhrases[i]))
		}
		sb.WriteString("\n")
	}

	if v != 7 {
		sb.WriteString("I don't know why she swallowed the fly. Perhaps she'll die.")
	}

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