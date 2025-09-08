package scale

import "strings"

func Scale(tonic string, interval string) (scale []string) {
	chromatic := []string{}
	useSharps := true

	switch tonic {
	case "C", "G", "D", "A", "E", "B", "F#", "a", "e", "b", "f#", "c#", "g#", "d#":
		chromatic = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	case "F", "Bb", "Eb", "Ab", "Db", "Gb", "d", "g", "c", "f", "bb", "eb":
		chromatic = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
		useSharps = false
	default:
		tonic = strings.Title(tonic)
		if strings.Contains("C G D A E B F# a e b f# c# g# d#", tonic) {
			chromatic = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
		} else {
			chromatic = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
			useSharps = false
		}

	}

	tonic = strings.Title(tonic)
	start := -1
	for i, note := range chromatic {
		if note == tonic {
			start = i
			break
		}
	}

	if start == -1 {
		return []string{} // Or handle error as appropriate
	}

	rotatedChromatic := make([]string, len(chromatic))
	copy(rotatedChromatic, chromatic[start:])
	copy(rotatedChromatic[len(chromatic)-start:], chromatic[:start])

	if interval == "" {
		return rotatedChromatic
	}

	partialScale := make([]string, 0, len(interval))
	stepsize := map[rune]int{'m': 1, 'M': 2, 'A': 3}
	currentIndex := 0

	for _, diff := range interval {
		if step, ok := stepsize[diff]; ok {
			partialScale = append(partialScale, rotatedChromatic[currentIndex%len(rotatedChromatic)])
			currentIndex += step
		}
	}

	return partialScale
}