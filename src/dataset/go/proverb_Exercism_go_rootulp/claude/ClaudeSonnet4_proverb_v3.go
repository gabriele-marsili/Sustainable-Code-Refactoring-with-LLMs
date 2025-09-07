package proverb

import "strings"

func Proverb(rhyme []string) []string {
	length := len(rhyme)
	if length == 0 {
		return []string{}
	}
	if length == 1 {
		return []string{footer(rhyme[0])}
	}
	return multilineProverb(rhyme)
}

func multilineProverb(rhyme []string) []string {
	length := len(rhyme)
	result := make([]string, length)
	
	var builder strings.Builder
	builder.Grow(64)
	
	for i := 0; i < length-1; i++ {
		builder.Reset()
		builder.WriteString("For want of a ")
		builder.WriteString(rhyme[i])
		builder.WriteString(" the ")
		builder.WriteString(rhyme[i+1])
		builder.WriteString(" was lost.")
		result[i] = builder.String()
	}
	
	result[length-1] = footer(rhyme[0])
	return result
}

func verse(itemA string, itemB string) string {
	var builder strings.Builder
	builder.Grow(len(itemA) + len(itemB) + 32)
	builder.WriteString("For want of a ")
	builder.WriteString(itemA)
	builder.WriteString(" the ")
	builder.WriteString(itemB)
	builder.WriteString(" was lost.")
	return builder.String()
}

func footer(item string) string {
	var builder strings.Builder
	builder.Grow(len(item) + 32)
	builder.WriteString("And all for the want of a ")
	builder.WriteString(item)
	builder.WriteString(".")
	return builder.String()
}