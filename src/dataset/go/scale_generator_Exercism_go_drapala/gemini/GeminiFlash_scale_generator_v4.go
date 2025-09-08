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
	"d":   true,
	"e":   true,
	"g":   true,
	"f#":  true,
	"F#":  true,
	"C#":  true,
	"G#":  true,
	"D#":  true,
	"A#":  true,
}

func Scale(tonic, interval string) []string {
	chromaticScale := chromaticSharps
	if _, ok := sharpTonics[tonic]; !ok {
		chromaticScale = chromaticFlats
	}

	tonicIndex := -1
	for i, note := range chromaticScale {
		if tonic == note {
			tonicIndex = i
			break
		}
		if tonic == "F" && note == "F" {
			tonicIndex = i
			break
		}
		if tonic == "f" && note == "F" {
			tonicIndex = i
			break
		}
		if tonic == "e" && note == "E" {
			tonicIndex = i
			break
		}
		if tonic == "Db" && note == "Db" {
			tonicIndex = i
			break
		}
		if tonic == "Eb" && note == "Eb" {
			tonicIndex = i
			break
		}
		if tonic == "bb" && note == "Bb" {
			tonicIndex = i
			break
		}
	}

	if tonicIndex == -1 {
		tonicIndex = -1
		for i, note := range chromaticSharps {
			if tonic == note {
				tonicIndex = i
				break
			}
		}
		if tonicIndex == -1 {
			for i, note := range chromaticFlats {
				if tonic == note {
					tonicIndex = i
					break
				}
			}
		}
	}

	if tonicIndex == -1 {
		return []string{}
	}

	if interval == "" {
		return rotate(chromaticScale, tonicIndex)
	}

	scale := make([]string, 0, len(interval)+1)
	scale = append(scale, chromaticScale[tonicIndex])
	currentIndex := tonicIndex

	for _, step := range interval {
		switch step {
		case 'M':
			currentIndex = (currentIndex + 2) % 12
		case 'm':
			currentIndex = (currentIndex + 1) % 12
		case 'A':
			currentIndex = (currentIndex + 3) % 12
		}
		scale = append(scale, chromaticScale[currentIndex])
	}

	return scale
}

func rotate(slice []string, i int) []string {
	rotated := make([]string, len(slice))
	copy(rotated, slice[i:])
	copy(rotated[len(slice)-i:], slice[:i])
	return rotated
}