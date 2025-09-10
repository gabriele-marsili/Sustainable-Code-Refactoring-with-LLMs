package foodchain

import (
	"strings"
)

// TestVersion is the unit test version that this program is built to pass.
const TestVersion = 1

var (
	first = []string{
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

	refrain = []string{
		"",
		"I don't know why she swallowed the fly. Perhaps she'll die.",
		"She swallowed the spider to catch the fly.\n",
		"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n",
		"She swallowed the cat to catch the bird.\n",
		"She swallowed the dog to catch the cat.\n",
		"She swallowed the goat to catch the dog.\n",
		"She swallowed the cow to catch the goat.\n",
	}

	verses = []string{
		"",
		"I know an old lady who swallowed a fly.\nI don't know why she swallowed the fly. Perhaps she'll die.",
		"I know an old lady who swallowed a spider.\nIt wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.",
		"I know an old lady who swallowed a bird.\nHow absurd to swallow a bird!\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.",
		"I know an old lady who swallowed a cat.\nImagine that, to swallow a cat!\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.",
		"I know an old lady who swallowed a dog.\nWhat a hog, to swallow a dog!\nShe swallowed the dog to catch the cat.\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.",
		"I know an old lady who swallowed a goat.\nJust opened her throat and swallowed a goat!\nShe swallowed the goat to catch the dog.\nShe swallowed the dog to catch the cat.\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.",
		"I know an old lady who swallowed a cow.\nI don't know how she swallowed a cow!\nShe swallowed the cow to catch the goat.\nShe swallowed the goat to catch the dog.\nShe swallowed the dog to catch the cat.\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.",
		"I know an old lady who swallowed a horse.\nShe's dead, of course!",
	}
)

// Verse sings a verse of "I know an old lady who swallowed a fly".
func Verse(v int) string {
	return verses[v]
}

// Verses sings a set of verses of "I know an old lady who swallowed a fly".
func Verses(start, stop int) string {
	result := make([]string, 0, stop-start+1)
	for i := start; i <= stop; i++ {
		result = append(result, verses[i])
	}
	return strings.Join(result, "\n\n")
}

// Song sings "I know an old lady who swallowed a fly" in it's entirty.
func Song() string {
	return Verses(1, 8)
}