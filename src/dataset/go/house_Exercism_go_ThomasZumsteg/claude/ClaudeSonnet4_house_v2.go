package house

import "strings"

/*Embed joins two phrases together.*/
func Embed(relPhrase, nounPhrase string) string {
	return relPhrase + " " + nounPhrase
}

/*Verse joings a subject with multiple phrases.*/
func Verse(subject string, relPhrase []string, nounPhrase string) string {
	if len(relPhrase) == 0 {
		return Embed(subject, nounPhrase)
	}
	
	var builder strings.Builder
	builder.WriteString(subject)
	
	for i := 0; i < len(relPhrase); i++ {
		builder.WriteString(" ")
		builder.WriteString(relPhrase[i])
	}
	
	builder.WriteString(" ")
	builder.WriteString(nounPhrase)
	
	return builder.String()
}

/*Song sings the full song of "The House that Jack Built".*/
func Song() string {
	firstLine := "This is"
	lastLine := "the house that Jack built."
	
	var builder strings.Builder
	
	for v := 0; v <= len(lyrics); v++ {
		if v > 0 {
			builder.WriteString("\n\n")
		}
		
		verse := Verse(firstLine, reverseView(lyrics, v), lastLine)
		builder.WriteString(verse)
	}
	
	return builder.String()
}

/*reverseView creates a reversed view of the first n items without allocating new memory.*/
func reverseView(items []string, n int) []string {
	if n == 0 {
		return nil
	}
	
	reversed := make([]string, n)
	for i := 0; i < n; i++ {
		reversed[i] = items[n-1-i]
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