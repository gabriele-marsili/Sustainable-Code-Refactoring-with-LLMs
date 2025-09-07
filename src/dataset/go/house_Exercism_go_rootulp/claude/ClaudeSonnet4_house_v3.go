package house

import (
	"fmt"
	"strings"
)

var (
	subjects = []string{
		"the house that Jack built.",
		"the malt",
		"the rat",
		"the cat",
		"the dog",
		"the cow with the crumpled horn",
		"the maiden all forlorn",
		"the man all tattered and torn",
		"the priest all shaven and shorn",
		"the rooster that crowed in the morn",
		"the farmer sowing his corn",
		"the horse and the hound and the horn",
	}
	
	actions = []string{
		"",
		"that lay in ",
		"that ate ",
		"that killed ",
		"that worried ",
		"that tossed ",
		"that milked ",
		"that kissed ",
		"that married ",
		"that woke ",
		"that kept ",
		"that belonged to ",
	}
	
	verseCache = make([]string, 13)
)

func init() {
	for i := 1; i <= 12; i++ {
		verseCache[i] = buildVerse(i)
	}
}

func buildVerse(v int) string {
	if v < 1 || v > 12 {
		return ""
	}
	
	var builder strings.Builder
	builder.WriteString("This is ")
	builder.WriteString(subjects[v-1])
	
	for i := v - 1; i > 0; i-- {
		builder.WriteByte('\n')
		builder.WriteString(actions[i])
		builder.WriteString(subjects[i-1])
	}
	
	return builder.String()
}

func Verse(v int) string {
	if v < 1 || v > 12 {
		panic(fmt.Sprintf("unsupported verseNumber %v", v))
	}
	return verseCache[v]
}

func Song() string {
	var builder strings.Builder
	totalLen := 0
	for i := 1; i <= 12; i++ {
		totalLen += len(verseCache[i])
	}
	totalLen += 22
	builder.Grow(totalLen)
	
	builder.WriteString(verseCache[1])
	for i := 2; i <= 12; i++ {
		builder.WriteString("\n\n")
		builder.WriteString(verseCache[i])
	}
	
	return builder.String()
}