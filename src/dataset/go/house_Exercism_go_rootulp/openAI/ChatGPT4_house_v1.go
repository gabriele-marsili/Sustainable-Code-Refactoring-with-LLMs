package house

import (
	"fmt"
	"strings"
)

var phrases = []string{
	"the horse and the hound and the horn\nthat belonged to ",
	"the farmer sowing his corn\nthat kept ",
	"the rooster that crowed in the morn\nthat woke ",
	"the priest all shaven and shorn\nthat married ",
	"the man all tattered and torn\nthat kissed ",
	"the maiden all forlorn\nthat milked ",
	"the cow with the crumpled horn\nthat tossed ",
	"the dog\nthat worried ",
	"the cat\nthat killed ",
	"the rat\nthat ate ",
	"the malt\nthat lay in ",
	"the house that Jack built.",
}

func Verse(v int) string {
	if v < 1 || v > 12 {
		panic(fmt.Sprintf("unsupported verseNumber %v", v))
	}
	var sb strings.Builder
	sb.WriteString("This is ")
	for i := 12 - v; i < 12; i++ {
		sb.WriteString(phrases[i])
	}
	return sb.String()
}

func Song() string {
	var sb strings.Builder
	for i := 1; i <= 12; i++ {
		if i > 1 {
			sb.WriteString("\n\n")
		}
		sb.WriteString(Verse(i))
	}
	return sb.String()
}