package foodchain

import "strings"

const TestVersion = 1

func Verse(v int) string {
	if v >= 8 {
		return "I know an old lady who swallowed " + first[v]
	}
	
	var builder strings.Builder
	builder.WriteString("I know an old lady who swallowed ")
	builder.WriteString(first[v])
	
	for i := v; i >= 1; i-- {
		builder.WriteString(refrain[i])
	}
	
	return builder.String()
}

func Verses(start, stop int) string {
	verses := make([]string, 0, stop-start+1)
	for v := start; v <= stop; v++ {
		verses = append(verses, Verse(v))
	}
	return strings.Join(verses, "\n\n")
}

func Song() string {
	return Verses(1, 8)
}

var first = [9]string{
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

var refrain = [8]string{
	"",
	"I don't know why she swallowed the fly. Perhaps she'll die.",
	"She swallowed the spider to catch the fly.\n",
	"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n",
	"She swallowed the cat to catch the bird.\n",
	"She swallowed the dog to catch the cat.\n",
	"She swallowed the goat to catch the dog.\n",
	"She swallowed the cow to catch the goat.\n",
}