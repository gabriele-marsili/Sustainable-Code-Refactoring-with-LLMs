package house

import "strings"

/*Embed joins two phrases together.*/
func Embed(relPhrase, nounPhrase string) string {
	return relPhrase + " " + nounPhrase
}

/*Verse joins a subject with multiple phrases.*/
func Verse(subject string, relPhrase []string, nounPhrase string) string {
	for _, phrase := range relPhrase {
		subject = Embed(subject, phrase)
	}
	return Embed(subject, nounPhrase)
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
		builder.WriteString(Verse(firstLine, reverse(lyrics[:v]), lastLine))
	}
	return builder.String()
}

/*reverse reverses an array in place.*/
func reverse(items []string) []string {
	for i, j := 0, len(items)-1; i < j; i, j = i+1, j-1 {
		items[i], items[j] = items[j], items[i]
	}
	return items
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