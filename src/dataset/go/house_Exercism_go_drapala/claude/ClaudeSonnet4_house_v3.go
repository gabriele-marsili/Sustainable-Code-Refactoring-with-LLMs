package house

import (
	"strings"
)

type item struct {
	noun   string
	action string
}

var items = [12]item{
	{"house that Jack built.", ""},
	{"malt", "lay in the"},
	{"rat", "ate the"},
	{"cat", "killed the"},
	{"dog", "worried the"},
	{"cow with the crumpled horn", "tossed the"},
	{"maiden all forlorn", "milked the"},
	{"man all tattered and torn", "kissed the"},
	{"priest all shaven and shorn", "married the"},
	{"rooster that crowed in the morn", "woke the"},
	{"farmer sowing his corn", "kept the"},
	{"horse and the hound and the horn", "belonged to the"},
}

func Verse(v int) string {
	var builder strings.Builder
	builder.Grow(200)
	
	builder.WriteString("This is the ")
	builder.WriteString(items[v-1].noun)
	
	for i := v - 2; i >= 0; i-- {
		builder.WriteString("\nthat ")
		builder.WriteString(items[i+1].action)
		builder.WriteString(" ")
		builder.WriteString(items[i].noun)
	}
	
	return builder.String()
}

func Song() string {
	var builder strings.Builder
	builder.Grow(3000)
	
	for i := 1; i <= 12; i++ {
		builder.WriteString(Verse(i))
		if i != 12 {
			builder.WriteString("\n\n")
		}
	}
	
	return builder.String()
}