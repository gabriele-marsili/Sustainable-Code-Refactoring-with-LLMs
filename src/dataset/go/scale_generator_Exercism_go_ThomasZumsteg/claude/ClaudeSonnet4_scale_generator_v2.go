package scale

import "strings"

var (
	sharpScale = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	flatScale  = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
	stepsize   = map[rune]int{'m': 1, 'M': 2, 'A': 3}
)

func Scale(tonic string, interval string) (scale []string) {
	// Use map lookup instead of switch for better performance
	useFlats := map[string]bool{
		"F": true, "Bb": true, "Eb": true, "Ab": true, "Db": true, "Gb": true,
		"d": true, "g": true, "c": true, "f": true, "bb": true, "eb": true,
	}
	
	if useFlats[tonic] {
		scale = flatScale
	} else {
		scale = sharpScale
	}
	
	tonic = strings.Title(tonic)
	
	// Find starting position
	startIdx := 0
	for i, elem := range scale {
		if elem == tonic {
			startIdx = i
			break
		}
	}
	
	// Create rotated scale without append operations
	rotatedScale := make([]string, 12)
	for i := 0; i < 12; i++ {
		rotatedScale[i] = scale[(startIdx+i)%12]
	}
	
	if interval == "" {
		return rotatedScale
	}
	
	partialScale := make([]string, 0, len(interval))
	i := 0
	for _, char := range interval {
		if step, ok := stepsize[char]; ok {
			partialScale = append(partialScale, rotatedScale[i%12])
			i += step
		}
	}
	
	return partialScale
}