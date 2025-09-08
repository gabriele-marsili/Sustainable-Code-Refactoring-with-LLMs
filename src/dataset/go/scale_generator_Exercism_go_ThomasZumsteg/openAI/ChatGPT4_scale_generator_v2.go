package scale

import "strings"

func Scale(tonic string, interval string) []string {
	sharps := map[string]bool{
		"C": true, "G": true, "D": true, "A": true, "E": true, "B": true, "F#": true,
		"a": true, "e": true, "b": true, "f#": true, "c#": true, "g#": true, "d#": true,
	}
	flats := map[string]bool{
		"F": true, "Bb": true, "Eb": true, "Ab": true, "Db": true, "Gb": true,
		"d": true, "g": true, "c": true, "f": true, "bb": true, "eb": true,
	}

	var scale []string
	if sharps[tonic] {
		scale = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	} else if flats[tonic] {
		scale = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
	}

	tonic = strings.Title(tonic)
	start := 0
	for i, elem := range scale {
		if elem == tonic {
			start = i
			break
		}
	}
	scale = append(scale[start:], scale[:start]...)

	if interval == "" {
		return scale
	}

	partialScale := make([]string, 0, len(interval))
	stepsize := map[byte]int{'m': 1, 'M': 2, 'A': 3}
	i := 0
	for j := 0; j < len(interval); j++ {
		step := stepsize[interval[j]]
		partialScale = append(partialScale, scale[i%len(scale)])
		i += step
	}

	return partialScale
}