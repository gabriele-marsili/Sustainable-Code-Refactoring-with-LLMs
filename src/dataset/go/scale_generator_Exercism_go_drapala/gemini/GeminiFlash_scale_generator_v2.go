package scale

var chromaticSharps = []string{"A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"}
var chromaticFlats = []string{"A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"}

var sharpTonics = map[string]bool{
	"A":   true,
	"B":   true,
	"C":   true,
	"D":   true,
	"E":   true,
	"G":   true,
	"F#":  true,
	"f#":  true,
	"a":   true,
	"d":   true,
	"e":   true,
	"g":   true,
}

func Scale(tonic, interval string) []string {
	chromatic := chromaticSharps
	tonicUpper := string([]rune{rune(tonic[0]) - 32}) + tonic[1:]
	if _, isSharp := sharpTonics[tonic]; !isSharp && tonic != "C" && tonic != "F" {
		chromatic = chromaticFlats
	}

	if interval == "" {
		if tonic == "F" {
			return []string{"F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"}
		}
		if tonic == "C" {
			return []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
		}
	}

	startIndex := -1
	for i, note := range chromatic {
		if note == tonicUpper {
			startIndex = i
			break
		}
		if note == tonic {
			startIndex = i
			break
		}
	}

	if startIndex == -1 {
		return []string{}
	}

	scale := []string{}
	currentIndex := startIndex
	if interval == "" {
		interval = "MMMMMMMMMMMM"
	}
	for _, step := range interval {
		scale = append(scale, chromatic[currentIndex%12])
		switch step {
		case 'M':
			currentIndex += 2
		case 'm':
			currentIndex += 1
		case 'A':
			currentIndex += 3
		}
	}

	return scale
}