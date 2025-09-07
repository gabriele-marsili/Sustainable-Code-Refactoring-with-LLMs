package house

import "strings"

func Embed(relPhrase, nounPhrase string) string {
	return relPhrase + " " + nounPhrase
}

func Verse(subject string, relPhrase []string, nounPhrase string) string {
	for _, phrase := range relPhrase {
		subject = Embed(subject, phrase)
	}
	return Embed(subject, nounPhrase)
}

func Song() string {
	firstLine := "This is"
	lastLine := "the house that Jack built."
	verses := make([]string, len(lyrics)+1)
	for v := 0; v <= len(lyrics); v++ {
		verses[v] = Verse(firstLine, reverse(lyrics[:v]), lastLine)
	}
	return strings.Join(verses, "\n\n")
}

func reverse(items []string) []string {
	for i, j := 0, len(items)-1; i < j; i, j = i+1, j-1 {
		items[i], items[j] = items[j], items[i]
	}
	return items
}

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