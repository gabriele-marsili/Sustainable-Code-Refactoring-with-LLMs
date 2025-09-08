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
	"a":   true,
	"b":   true,
	"c":   true,
	"d":   true,
	"e":   true,
	"g":   true,
	"f#":  true,
	"F#":  true,
}

func Scale(tonic, interval string) []string {
	chromaticScale := chromaticSharps
	if _, isSharp := sharpTonics[tonic]; !isSharp && tonic != "" {
		chromaticScale = chromaticFlats
	}

	tonicIndex := -1
	for i, note := range chromaticScale {
		if equalFold(note, tonic) {
			tonicIndex = i
			break
		}
	}

	if tonicIndex == -1 {
		return []string{}
	}

	if interval == "" {
		return rotate(chromaticScale, tonicIndex)
	}

	scale := make([]string, 0, len(interval)+1)
	currentIndex := tonicIndex
	for i := 0; i < len(interval); i++ {
		scale = append(scale, chromaticScale[currentIndex%12])
		switch interval[i] {
		case 'M':
			currentIndex += 2
		case 'm':
			currentIndex += 1
		case 'A':
			currentIndex += 3
		}
	}
	scale = append(scale, chromaticScale[currentIndex%12])

	return scale
}

func rotate(slice []string, i int) []string {
	rotated := make([]string, len(slice))
	copy(rotated, slice[i:])
	copy(rotated[len(slice)-i:], slice[:i])
	return rotated
}

func equalFold(s, t string) bool {
	if len(s) != len(t) {
		return false
	}
	for i := 0; i < len(s); i++ {
		if lower(s[i]) != lower(t[i]) {
			return false
		}
	}
	return true
}

func lower(b byte) byte {
	if b >= 'A' && b <= 'Z' {
		return b + 32
	}
	return b
}