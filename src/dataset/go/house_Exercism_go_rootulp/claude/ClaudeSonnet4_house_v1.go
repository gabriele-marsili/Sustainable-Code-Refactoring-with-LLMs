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
	
	verses = make([]string, 13)
)

func init() {
	var builder strings.Builder
	
	for v := 1; v <= 12; v++ {
		builder.Reset()
		builder.WriteString("This is ")
		builder.WriteString(subjects[v-1])
		
		for i := v - 1; i > 0; i-- {
			builder.WriteByte('\n')
			builder.WriteString(actions[i])
			builder.WriteString(subjects[i-1])
		}
		
		verses[v] = builder.String()
	}
}

func Verse(v int) string {
	if v < 1 || v > 12 {
		panic(fmt.Sprintf("unsupported verseNumber %v", v))
	}
	return verses[v]
}

func Song() string {
	return strings.Join(verses[1:], "\n\n")
}