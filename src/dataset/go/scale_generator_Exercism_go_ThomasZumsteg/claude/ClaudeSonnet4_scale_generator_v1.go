package scale

import "strings"

var (
	sharpScale = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	flatScale  = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
	stepsize   = map[rune]int{'m': 1, 'M': 2, 'A': 3}
)

func Scale(tonic string, interval string) (scale []string) {
	// Use pre-allocated slices instead of switch
	switch tonic {
	case "C", "G", "D", "A", "E", "B", "F#", "a", "e", "b", "f#", "c#", "g#", "d#":
		scale = sharpScale
	case "F", "Bb", "Eb", "Ab", "Db", "Gb", "d", "g", "c", "f", "bb", "eb":
		scale = flatScale
	}
	
	tonic = strings.Title(tonic)
	
	// Find starting position and rotate
	startIdx := -1
	for i, elem := range scale {
		if elem == tonic {
			startIdx = i
			break
		}
	}
	
	if startIdx > 0 {
		rotated := make([]string, len(scale))
		copy(rotated, scale[startIdx:])
		copy(rotated[len(scale)-startIdx:], scale[:startIdx])
		scale = rotated
	}

	if interval == "" {
		return scale
	}

	// Pre-allocate with estimated capacity
	partialScale := make([]string, 0, len(interval))
	i := 0
	
	// Iterate over runes instead of splitting string
	for _, r := range interval {
		if step, ok := stepsize[r]; ok {
			partialScale = append(partialScale, scale[i%len(scale)])
			i += step
		}
	}

	return partialScale
}