package igpay

import (
	"regexp"
	"strings"
)

var (
	wordSplitter = regexp.MustCompile("\\s+")
	patterns     = []*regexp.Regexp{
		regexp.MustCompile("^()(y[^aeiou].*)"),
		regexp.MustCompile("(.*?[^q])(u.*)"),
		regexp.MustCompile("(.*?)([aeoi].*)"),
	}
)

/*PigLatin converts a sentence to pig latin.*/
func PigLatin(engl string) string {
	words := wordSplitter.Split(engl, -1)
	pigWords := make([]string, len(words))
	for i, word := range words {
		pigWords[i] = pigLatinWord(word)
	}
	return strings.Join(pigWords, " ")
}

/*pigLatinWord converts a single word to pig latin.*/
func pigLatinWord(engl string) string {
	for _, pattern := range patterns {
		if parts := pattern.FindStringSubmatch(engl); len(parts) == 3 {
			return parts[2] + parts[1] + "ay"
		}
	}
	return engl + "ay"
}