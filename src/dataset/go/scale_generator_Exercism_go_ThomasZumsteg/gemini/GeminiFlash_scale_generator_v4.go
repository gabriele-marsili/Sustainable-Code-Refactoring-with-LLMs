package scale

import "strings"

func Scale(tonic string, interval string) (scale []string) {
	sharps := []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	flats := []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}

	useSharps := false
	switch tonic {
	case "C", "G", "D", "A", "E", "B", "F#", "a", "e", "b", "f#", "c#", "g#", "d#":
		useSharps = true
	case "F", "Bb", "Eb", "Ab", "Db", "Gb", "d", "g", "c", "f", "bb", "eb":
		useSharps = false
	default:
		tonic = strings.Title(tonic)
		switch tonic {
		case "C", "G", "D", "A", "E", "B", "F#":
			useSharps = true
		case "F", "Bb", "Eb", "Ab", "Db", "Gb":
			useSharps = false
		default:
			return []string{}
		}
	}

	if useSharps {
		scale = sharps
	} else {
		scale = flats
	}

	tonic = strings.Title(tonic)
	start := -1
	for i, note := range scale {
		if note == tonic {
			start = i
			break
		}
	}

	if start == -1 {
		return []string{}
	}

	rotatedScale := make([]string, len(scale))
	copy(rotatedScale, scale[start:])
	copy(rotatedScale[len(scale)-start:], scale[:start])
	scale = rotatedScale

	if interval == "" {
		return scale
	}

	partialScale := make([]string, 0, len(interval))
	stepsize := map[string]int{"m": 1, "M": 2, "A": 3}
	index := 0
	for _, diff := range interval {
		step, ok := stepsize[string(diff)]
		if !ok {
			continue
		}
		partialScale = append(partialScale, scale[index])
		index = (index + step) % len(scale)
	}

	return partialScale
}