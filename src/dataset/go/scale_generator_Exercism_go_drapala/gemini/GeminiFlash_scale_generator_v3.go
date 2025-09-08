package scale

import (
	"strings"
)

var chromaticSharps = []string{"A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"}
var chromaticFlats = []string{"A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"}

var sharpTonics = map[string]bool{
	"G": true, "D": true, "A": true, "E": true, "B": true, "F#": true, "e": true, "b": true, "f#": true, "c#": true, "g#": true, "d#": true, "a#": true,
}

var intervalSteps = map[rune]int{
	'M': 2,
	'm': 1,
	'A': 3,
}

func Scale(tonic, interval string) []string {
	tonic = strings.Title(tonic)
	useSharps := sharpTonics[tonic] || tonic == "F#" || strings.Contains(tonic, "#")
	chromaticScale := chromaticSharps
	if !useSharps {
		chromaticScale = chromaticFlats
	}

	startIndex := -1
	for i, note := range chromaticScale {
		if strings.EqualFold(note, tonic) {
			startIndex = i
			break
		}
	}

	if startIndex == -1 {
		return []string{}
	}

	if interval == "" {
		return rotate(chromaticScale, startIndex)
	}

	notes := make([]string, 0, len(interval))
	currentIndex := startIndex
	for _, step := range interval {
		notes = append(notes, chromaticScale[currentIndex%len(chromaticScale)])
		currentIndex += intervalSteps[step]
	}

	return notes
}

func rotate(slice []string, i int) []string {
	rotated := make([]string, len(slice))
	copy(rotated, slice[i:])
	copy(rotated[len(slice)-i:], slice[:i])
	return rotated
}