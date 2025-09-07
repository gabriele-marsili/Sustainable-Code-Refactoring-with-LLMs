package house

import "strings"

var subjects = []string{
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

var actions = []string{
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

func Verse(v int) string {
	if v < 1 || v > 12 {
		panic("unsupported verseNumber")
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

func Song() string {
	var builder strings.Builder
	for i := 1; i <= 12; i++ {
		if i > 1 {
			builder.WriteString("\n\n")
		}
		builder.WriteString(Verse(i))
	}
	return builder.String()
}