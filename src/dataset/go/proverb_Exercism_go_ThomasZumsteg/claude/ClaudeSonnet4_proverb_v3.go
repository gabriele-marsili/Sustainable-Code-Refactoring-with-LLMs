package proverb

import "strings"

func Proverb(rhyme []string) []string {
	if len(rhyme) == 0 {
		return []string{}
	}

	result := make([]string, 0, len(rhyme))
	var builder strings.Builder
	
	for i := 0; i < len(rhyme)-1; i++ {
		builder.Reset()
		builder.WriteString("For want of a ")
		builder.WriteString(rhyme[i])
		builder.WriteString(" the ")
		builder.WriteString(rhyme[i+1])
		builder.WriteString(" was lost.")
		result = append(result, builder.String())
	}
	
	builder.Reset()
	builder.WriteString("And all for the want of a ")
	builder.WriteString(rhyme[0])
	builder.WriteString(".")
	result = append(result, builder.String())
	
	return result
}