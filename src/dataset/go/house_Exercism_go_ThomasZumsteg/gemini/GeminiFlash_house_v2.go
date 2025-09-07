package house

import "strings"

// lyrics to the song "The House that Jack Built".
var lyrics = []string{
	"the malt\nthat lay in",
	"the rat\nthat ate",
	"the cat\nthat killed",
	"the dog\nthat worried",
	"the cow with the crumpled horn\nthat tossed",
	"the maiden all forlorn\nthat milked",
	"the man all tattered and torn\nthat kissed",
	"the priest all shaven and shorn\nthat married",
	"the rooster that crowed in the morn\nthat woke",
	"the farmer sowing his corn\nthat kept",
	"the horse and the hound and the horn\nthat belonged to",
}

/*Song sings the full song of "The House that Jack Built".*/
func Song() string {
	firstLine := "This is"
	lastLine := "the house that Jack built."
	verses := make([]string, 0, len(lyrics)+1) // Pre-allocate for efficiency

	for i := 0; i <= len(lyrics); i++ {
		verse := buildVerse(firstLine, lyrics[:i], lastLine)
		verses = append(verses, verse)
	}

	return strings.Join(verses, "\n\n")
}

func buildVerse(subject string, relPhrases []string, nounPhrase string) string {
	// Reverse the relative phrases in place for efficiency
	for i, j := 0, len(relPhrases)-1; i < j; i, j = i+1, j-1 {
		relPhrases[i], relPhrases[j] = relPhrases[j], relPhrases[i]
	}

	// Build the verse using a string builder for efficiency
	var sb strings.Builder
	sb.WriteString(subject)

	for _, phrase := range relPhrases {
		sb.WriteString(" ")
		sb.WriteString(phrase)
	}

	sb.WriteString(" ")
	sb.WriteString(nounPhrase)

	return sb.String()
}