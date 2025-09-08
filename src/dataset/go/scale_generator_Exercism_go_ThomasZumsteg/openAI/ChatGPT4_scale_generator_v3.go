package scale

import "strings"

func Scale(tonic string, interval string) []string {
	sharps := []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	flats := []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}

	var scale []string
	if strings.Contains("CGDAEBF#aebfc#d#g#", tonic) {
		scale = sharps
	} else {
		scale = flats
	}

	tonic = strings.ToUpper(tonic[:1]) + tonic[1:]
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

	stepsize := map[byte]int{'m': 1, 'M': 2, 'A': 3}
	partialScale := make([]string, 0, len(interval))
	i := 0
	for _, diff := range interval {
		partialScale = append(partialScale, scale[i%len(scale)])
		i += stepsize[byte(diff)]
	}

	return partialScale
}