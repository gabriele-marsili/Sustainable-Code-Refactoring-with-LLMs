package foodchain

import (
	"strings"
)

// TestVersion is the unit test version that this program is built to pass.
const TestVersion = 1

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

// Verse sings a verse of "I know an old lady who swallowed a fly".
func Verse(v int) string {
	var sb strings.Builder
	sb.WriteString("I know an old lady who swallowed ")
	sb.WriteString(first[v])

	if v >= 8 {
		return sb.String()
	}

	for i := v; i >= 1; i-- {
		sb.WriteString(refrain[i])
	}

	return sb.String()
}

// Verses sings a set of verses of "I know an old lady who swallowed a fly".
func Verses(start, stop int) string {
	var sb strings.Builder
	for v := start; v <= stop; v++ {
		sb.WriteString(Verse(v))
		if v < stop {
			sb.WriteString("\n\n")
		}
	}
	return sb.String()
}

// Song sings "I know an old lady who swallowed a fly" in it's entirty.
func Song() string {
	return Verses(1, 8)
}