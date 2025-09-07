package house

import (
	"strings"
)

/*Embed joins two phrases together.*/
func Embed(relPhrase, nounPhrase string) string {
	return relPhrase + " " + nounPhrase
}

/*Verse joings a subject with multiple phrases.*/
func Verse(subject string, relPhrase []string, nounPhrase string) string {
	if len(relPhrase) == 0 {
		return Embed(subject, nounPhrase)
	}
	return Verse(Embed(subject, relPhrase[0]), relPhrase[1:], nounPhrase)
}

/*Song sings the full song of "The House that Jack Built".*/
func Song() string {
	const firstLine = "This is"
	const lastLine = "the house that Jack built."
	
	verses := make([]string, 0, len(lyrics)+1)
	
	for v := 0; v <= len(lyrics); v++ {
		verse := Verse(firstLine, reverse(lyrics[:v]), lastLine)
		verses = append(verses, verse)
	}
	return strings.Join(verses, "\n\n")
}

/*reverse reverses and array.*/
func reverse(items []string) []string {
	if len(items) == 0 {
		return items
	}
	
	reversed := make([]string, len(items))
	for i := 0; i < len(items); i++ {
		reversed[len(items)-1-i] = items[i]
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