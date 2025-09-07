package house

import (
	"strings"
)

var nounToActionMap = map[string]string{
	"house that Jack built.":           "",
	"malt":                             "lay in the",
	"rat":                              "ate the",
	"cat":                              "killed the",
	"dog":                              "worried the",
	"cow with the crumpled horn":       "tossed the",
	"maiden all forlorn":               "milked the",
	"man all tattered and torn":        "kissed the",
	"priest all shaven and shorn":      "married the",
	"rooster that crowed in the morn":  "woke the",
	"farmer sowing his corn":           "kept the",
	"horse and the hound and the horn": "belonged to the",
}

var sequence = []string{"house that Jack built.", "malt", "rat", "cat", "dog", "cow with the crumpled horn", "maiden all forlorn", "man all tattered and torn", "priest all shaven and shorn", "rooster that crowed in the morn", "farmer sowing his corn", "horse and the hound and the horn"}

func Verse(v int) string {
	var sb strings.Builder
	stack := sequence[:v]
	for i := v - 1; i >= 0; i-- {
		if i == v-1 {
			sb.WriteString("This is the ")
			sb.WriteString(stack[i])
		} else {
			sb.WriteString("\nthat ")
			sb.WriteString(nounToActionMap[stack[i+1]])
			sb.WriteString(" ")
			sb.WriteString(stack[i])
		}
	}
	return sb.String()
}

func Song() string {
	var sb strings.Builder
	for i := 1; i <= len(sequence); i++ {
		sb.WriteString(Verse(i))
		if i != len(sequence) {
			sb.WriteString("\n\n")
		}
	}
	return sb.String()
}