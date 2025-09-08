package scale

import "strings"

func Scale(tonic string, interval string) []string {
	var scale []string
	sharps := "C G D A E B F# a e b f# c# g# d#"
	flats := "F Bb Eb Ab Db Gb d g c f bb eb"

	tonic = strings.Title(tonic)

	if strings.Contains(sharps, tonic) {
		scale = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	} else if strings.Contains(flats, tonic) {
		scale = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
	} else {
		return []string{} // Handle invalid tonic
	}

	start := -1
	for i, note := range scale {
		if note == tonic {
			start = i
			break
		}
	}

	if start == -1 {
		return []string{} // Handle tonic not found (shouldn't happen with valid input)
	}

	rotatedScale := make([]string, len(scale))
	copy(rotatedScale, scale[start:])
	copy(rotatedScale[len(scale)-start:], scale[:start])

	if interval == "" {
		return rotatedScale
	}

	stepsize := map[rune]int{'m': 1, 'M': 2, 'A': 3}
	partialScale := make([]string, 0, len(interval))
	index := 0

	for _, diff := range interval {
		if step, ok := stepsize[diff]; ok {
			partialScale = append(partialScale, rotatedScale[index])
			index = (index + step) % len(rotatedScale)
		}
	}

	return partialScale
}