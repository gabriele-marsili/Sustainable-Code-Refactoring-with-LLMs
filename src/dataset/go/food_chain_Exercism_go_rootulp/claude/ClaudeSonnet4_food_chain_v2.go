package foodchain

import (
	"strings"
)

var animals = [9]string{"", "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"}

var middleLineTemplates = [8][]string{
	{}, // verse 1
	{"It wriggled and jiggled and tickled inside her.", "She swallowed the spider to catch the fly."},
	{"How absurd to swallow a bird!", "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her."},
	{"Imagine that, to swallow a cat!", "She swallowed the cat to catch the bird."},
	{"What a hog, to swallow a dog!", "She swallowed the dog to catch the cat."},
	{"Just opened her throat and swallowed a goat!", "She swallowed the goat to catch the dog."},
	{"I don't know how she swallowed a cow!", "She swallowed the cow to catch the goat."},
	{}, // verse 8
}

var precomputedMiddleLines [8][]string

func init() {
	precomputedMiddleLines[0] = []string{}
	precomputedMiddleLines[1] = middleLineTemplates[1]
	precomputedMiddleLines[7] = []string{}
	
	for i := 2; i <= 6; i++ {
		lines := make([]string, 0, i*2)
		lines = append(lines, middleLineTemplates[i]...)
		lines = append(lines, precomputedMiddleLines[i-1][1:]...)
		precomputedMiddleLines[i] = lines
	}
}

func Verse(verseNumber int) string {
	var builder strings.Builder
	builder.Grow(200)
	
	builder.WriteString("I know an old lady who swallowed a ")
	builder.WriteString(animals[verseNumber])
	builder.WriteString(".")
	
	for _, line := range precomputedMiddleLines[verseNumber-1] {
		builder.WriteString("\n")
		builder.WriteString(line)
	}
	
	builder.WriteString("\n")
	if verseNumber == 8 {
		builder.WriteString("She's dead, of course!")
	} else {
		builder.WriteString("I don't know why she swallowed the fly. Perhaps she'll die.")
	}
	
	return builder.String()
}

func Verses(start, end int) string {
	var builder strings.Builder
	builder.Grow((end - start + 1) * 250)
	
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