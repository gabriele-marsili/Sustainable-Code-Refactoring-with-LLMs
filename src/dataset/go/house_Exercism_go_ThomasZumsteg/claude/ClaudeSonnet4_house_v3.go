package house

import "strings"

/*Embed joins two phrases together.*/
func Embed(relPhrase, nounPhrase string) string {
	var builder strings.Builder
	builder.Grow(len(relPhrase) + len(nounPhrase) + 1)
	builder.WriteString(relPhrase)
	builder.WriteByte(' ')
	builder.WriteString(nounPhrase)
	return builder.String()
}

/*Verse joings a subject with multiple phrases.*/
func Verse(subject string, relPhrase []string, nounPhrase string) string {
	if len(relPhrase) == 0 {
		return Embed(subject, nounPhrase)
	}
	
	var builder strings.Builder
	totalLen := len(subject) + len(nounPhrase) + 1
	for _, phrase := range relPhrase {
		totalLen += len(phrase) + 1
	}
	builder.Grow(totalLen)
	
	builder.WriteString(subject)
	for _, phrase := range relPhrase {
		builder.WriteByte(' ')
		builder.WriteString(phrase)
	}
	builder.WriteByte(' ')
	builder.WriteString(nounPhrase)
	
	return builder.String()
}

/*Song sings the full song of "The House that Jack Built".*/
func Song() string {
	const firstLine = "This is"
	const lastLine = "the house that Jack built."
	
	verses := make([]string, len(lyrics)+1)
	
	for v := 0; v <= len(lyrics); v++ {
		if v == 0 {
			verses[v] = Embed(firstLine, lastLine)
		} else {
			reversedLyrics := make([]string, v)
			for i := 0; i < v; i++ {
				reversedLyrics[i] = lyrics[v-1-i]
			}
			verses[v] = Verse(firstLine, reversedLyrics, lastLine)
		}
	}
	
	return strings.Join(verses, "\n\n")
}

/*reverse reverses and array.*/
func reverse(items []string) []string {
	l := len(items)
	reversed := make([]string, l)
	for i := 0; i < l; i++ {
		reversed[l-i-1] = items[i]
	}
	return reversed
}

//lyrics to the song "The House that Jack Built".
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