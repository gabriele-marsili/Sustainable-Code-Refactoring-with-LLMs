package house

import "strings"

/*Embed joins two phrases together.*/
func Embed(relPhrase, nounPhrase string) string {
	return relPhrase + " " + nounPhrase
}

/*Verse joings a subject with multiple phrases.*/
func Verse(subject string, relPhrase []string, nounPhrase string) string {
	for i := len(relPhrase) - 1; i >= 0; i-- {
		subject = Embed(subject, relPhrase[i])
	}
	return Embed(subject, nounPhrase)
}

/*Song sings the full song of "The House that Jack Built".*/
func Song() string {
	firstLine := "This is"
	lastLine := "the house that Jack built."
	verses := make([]string, len(lyrics)+1)
	for v := 0; v <= len(lyrics); v++ {
		verses[v] = Verse(firstLine, lyrics[:v], lastLine)
	}
	return strings.Join(verses, "\n\n")
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