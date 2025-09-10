package igpay

import (
	"strings"
)

/*PigLatin converts a sentance to pig latin.*/
func PigLatin(engl string) string {
	words := strings.Split(engl, " ")
	pigWords := make([]string, len(words))
	for i, word := range words {
		pigWords[i] = pigLatinWord(word)
	}
	return strings.Join(pigWords, " ")
}

/*pigLatinWord converts a single word to piglating.*/
func pigLatinWord(engl string) string {
	engl = strings.ToLower(engl)
	if len(engl) == 0 {
		return ""
	}

	firstChar := engl[0]

	if strings.HasPrefix(engl, "qu") {
		return engl[2:] + "quay"
	}

	if firstChar == 'a' || firstChar == 'e' || firstChar == 'i' || firstChar == 'o' || firstChar == 'u' {
		return engl + "ay"
	}

	if firstChar == 'y' {
		if len(engl) > 1 && !isVowel(engl[1]) {
			return engl[1:] + "yay"
		}
		return engl + "ay"

	}

	consonantCluster := ""
	for i := 0; i < len(engl); i++ {
		if isVowel(engl[i]) {
			consonantCluster = engl[:i]
			engl = engl[i:]
			break
		}
		if engl[i] == 'y' {
			consonantCluster = engl[:i]
			engl = engl[i:]
			break
		}
		if i == len(engl)-1 {
			consonantCluster = engl
			engl = ""
			break
		}
	}

	return engl + consonantCluster + "ay"
}

func isVowel(r byte) bool {
	return r == 'a' || r == 'e' || r == 'i' || r == 'o' || r == 'u'
}