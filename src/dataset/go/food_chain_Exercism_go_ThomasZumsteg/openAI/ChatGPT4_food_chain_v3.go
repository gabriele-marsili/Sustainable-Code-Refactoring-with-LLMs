package foodchain

import "strings"

const TestVersion = 1

func Verse(v int) string {
	if v >= 8 {
		return "I know an old lady who swallowed " + first[v]
	}
	var sb strings.Builder
	sb.WriteString("I know an old lady who swallowed ")
	sb.WriteString(first[v])
	for i := v; i > 0; i-- {
		sb.WriteString(refrain[i])
	}
	return sb.String()
}

func Verses(start, stop int) string {
	var sb strings.Builder
	for v := start; v <= stop; v++ {
		if v > start {
			sb.WriteString("\n\n")
		}
		sb.WriteString(Verse(v))
	}
	return sb.String()
}

func Song() string {
	return Verses(1, 8)
}

var first = []string{
	"",
	"a fly.\n",
	"a spider.\nIt wriggled and jiggled and tickled inside her.\n",
	"a bird.\nHow absurd to swallow a bird!\n",
	"a cat.\nImagine that, to swallow a cat!\n",
	"a dog.\nWhat a hog, to swallow a dog!\n",
	"a goat.\nJust opened her throat and swallowed a goat!\n",
	"a cow.\nI don't know how she swallowed a cow!\n",
	"a horse.\nShe's dead, of course!",
}

var refrain = []string{
	"",
	"I don't know why she swallowed the fly. Perhaps she'll die.",
	"She swallowed the spider to catch the fly.\n",
	"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n",
	"She swallowed the cat to catch the bird.\n",
	"She swallowed the dog to catch the cat.\n",
	"She swallowed the goat to catch the dog.\n",
	"She swallowed the cow to catch the goat.\n",
}