package proverb

import (
	"strings"
)

func Proverb(rhyme []string) []string {
	length := len(rhyme)
	if length == 0 {
		return []string{}
	}

	result := make([]string, 0, length)
	var sb strings.Builder
	for i := 0; i < length-1; i++ {
		sb.WriteString("For want of a ")
		sb.WriteString(rhyme[i])
		sb.WriteString(" the ")
		sb.WriteString(rhyme[i+1])
		sb.WriteString(" was lost.")
		result = append(result, sb.String())
		sb.Reset()
	}

	sb.WriteString("And all for the want of a ")
	sb.WriteString(rhyme[0])
	sb.WriteString(".")
	result = append(result, sb.String())

	return result
}