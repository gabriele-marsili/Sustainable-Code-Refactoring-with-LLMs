package scale

import "strings"

func Scale(tonic string, interval string) []string {
	var scale []string
	useSharps := true

	switch tonic {
	case "C", "G", "D", "A", "E", "B", "F#", "a", "e", "b", "f#", "c#", "g#", "d#":
		scale = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	case "F", "Bb", "Eb", "Ab", "Db", "Gb", "d", "g", "c", "f", "bb", "eb":
		scale = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
		useSharps = false
	default:
		tonic = strings.Title(tonic)
		switch tonic {
		case "C", "G", "D", "A", "E", "B", "F#":
			scale = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
		case "F", "Bb", "Eb", "Ab", "Db", "Gb":
			scale = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
			useSharps = false
		default:
			tonic = strings.Title(tonic)
			if strings.Contains("abcdefg", strings.ToLower(string(tonic[0]))) {
				if strings.Contains("abcdefg", string(tonic[0])) {
					useSharps = false
					scale = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}

				} else {
					scale = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
				}

			}
		}
	}

	tonic = strings.Title(tonic)
	start := -1
	for i, elem := range scale {
		if elem == tonic {
			start = i
			break
		}
	}

	if start != -1 {
		newScale := make([]string, len(scale))
		copy(newScale, scale[start:])
		copy(newScale[len(scale)-start:], scale[:start])
		scale = newScale
	}

	if interval == "" {
		return scale
	}

	stepsize := map[rune]int{'m': 1, 'M': 2, 'A': 3}
	partialScale := make([]string, 0, len(interval))
	i := 0
	for _, diff := range interval {
		if step, ok := stepsize[diff]; ok {
			partialScale = append(partialScale, scale[i%len(scale)])
			i += step
		}
	}

	return partialScale
}