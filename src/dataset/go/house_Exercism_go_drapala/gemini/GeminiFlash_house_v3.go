package house

import (
	"strings"
)

var (
	nouns = []string{
		"house that Jack built.",
		"malt",
		"rat",
		"cat",
		"dog",
		"cow with the crumpled horn",
		"maiden all forlorn",
		"man all tattered and torn",
		"priest all shaven and shorn",
		"rooster that crowed in the morn",
		"farmer sowing his corn",
		"horse and the hound and the horn",
	}
	actions = []string{
		"",
		"lay in the",
		"ate the",
		"killed the",
		"worried the",
		"tossed the",
		"milked the",
		"kissed the",
		"married the",
		"woke the",
		"kept the",
		"belonged to the",
	}
)

func Verse(v int) string {
	var sb strings.Builder
	sb.WriteString("This is the ")
	sb.WriteString(nouns[v-1])

	for i := v - 2; i >= 0; i-- {
		sb.WriteString("\nthat ")
		sb.WriteString(actions[i+1])
		sb.WriteString(" ")
		sb.WriteString(nouns[i])
	}

	return sb.String()
}

func Song() string {
	var sb strings.Builder
	for i := 1; i <= len(nouns); i++ {
		sb.WriteString(Verse(i))
		if i != len(nouns) {
			sb.WriteString("\n\n")
		}
	}
	return sb.String()
}