package reverse

import "unicode/utf8"

func Reverse(input string) string {
	if len(input) == 0 {
		return input
	}
	
	runeCount := utf8.RuneCountInString(input)
	if runeCount <= 1 {
		return input
	}
	
	runes := make([]rune, runeCount)
	i := 0
	for _, r := range input {
		runes[i] = r
		i++
	}
	
	for i, j := 0, runeCount-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	
	return string(runes)
}