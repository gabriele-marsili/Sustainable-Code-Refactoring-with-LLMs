package scale

import "strings"

var (
	sharpScale = [12]string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
	flatScale  = [12]string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}
	
	sharpTonics = map[string]bool{
		"C": true, "G": true, "D": true, "A": true, "E": true, "B": true, "F#": true,
		"a": true, "e": true, "b": true, "f#": true, "c#": true, "g#": true, "d#": true,
	}
	
	stepSize = map[byte]int{'m': 1, 'M': 2, 'A': 3}
)

func Scale(tonic string, interval string) (scale []string) {
	var baseScale [12]string
	if sharpTonics[tonic] {
		baseScale = sharpScale
	} else {
		baseScale = flatScale
	}
	
	normalizedTonic := strings.Title(tonic)
	
	var startIndex int
	for i, note := range baseScale {
		if note == normalizedTonic {
			startIndex = i
			break
		}
	}
	
	rotatedScale := make([]string, 12)
	for i := 0; i < 12; i++ {
		rotatedScale[i] = baseScale[(startIndex+i)%12]
	}
	
	if interval == "" {
		return rotatedScale
	}
	
	partialScale := make([]string, 0, len(interval))
	pos := 0
	for i := 0; i < len(interval); i++ {
		if step, ok := stepSize[interval[i]]; ok {
			partialScale = append(partialScale, rotatedScale[pos%12])
			pos += step
		}
	}
	
	return partialScale
}