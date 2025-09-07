package proverb

import (
	"strings"
)

func Proverb(rhyme []string) []string {
	if len(rhyme) == 0 {
		return []string{}
	}

	result := make([]string, 0, len(rhyme))
	for i := 0; i < len(rhyme)-1; i++ {
		var sb strings.Builder
		sb.WriteString("For want of a ")
		sb.WriteString(rhyme[i])
		sb.WriteString(" the ")
		sb.WriteString(rhyme[i+1])
		sb.WriteString(" was lost.")
		result = append(result, sb.String())
	}

	var sb strings.Builder
	sb.WriteString("And all for the want of a ")
	sb.WriteString(rhyme[0])
	sb.WriteString(".")
	result = append(result, sb.String())

	return result
}