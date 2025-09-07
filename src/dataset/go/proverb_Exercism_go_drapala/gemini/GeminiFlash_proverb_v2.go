package proverb

import (
	"fmt"
	"strings"
)

func Proverb(rhyme []string) []string {
	length := len(rhyme)
	if length == 0 {
		return []string{}
	}

	proverb := make([]string, 0, length) // Pre-allocate slice for efficiency

	if length == 1 {
		proverb = append(proverb, fmt.Sprintf("And all for the want of a %s.", rhyme[0]))
		return proverb
	}

	for i := 0; i < length-1; i++ {
		proverb = append(proverb, fmt.Sprintf("For want of a %s the %s was lost.", rhyme[i], rhyme[i+1]))
	}

	proverb = append(proverb, fmt.Sprintf("And all for the want of a %s.", rhyme[0]))
	return proverb
}

func ProverbMaker(first, second string) string {
	var sb strings.Builder
	if second == "" {
		sb.WriteString("And all for the want of a ")
		sb.WriteString(first)
		sb.WriteString(".")
	} else {
		sb.WriteString("For want of a ")
		sb.WriteString(first)
		sb.WriteString(" the ")
		sb.WriteString(second)
		sb.WriteString(" was lost.")
	}
	return sb.String()
}