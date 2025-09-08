package scale

import "strings"

func Scale(tonic string, interval string) []string {
	sharps := map[string]bool{
		"C": true, "G": true, "D": true, "A": true, "E": true, "B": true, "F#": true,
		"a": true, "e": true, "b": true, "f#": true, "c#": true, "g#": true, "d#": true,
	}
	scale := []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	if !sharps[strings.Title(tonic)] {
		scale = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
	}

	tonic = strings.Title(tonic)
	start := 0
	for i, note := range scale {
		if note == tonic {
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
		if step, ok := stepsize[interval[j]]; ok {
			partialScale = append(partialScale, scale[i%len(scale)])
			i += step
		}
	}

	return partialScale
}