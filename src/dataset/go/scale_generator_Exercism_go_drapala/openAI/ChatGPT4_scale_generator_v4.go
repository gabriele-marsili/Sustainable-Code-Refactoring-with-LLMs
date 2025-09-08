package scale

var scales = map[string]map[string][]string{
	"A": {
		"MMAMA": []string{"A", "B", "C#", "E", "F#"},
	},
	"a": {
		"MMMmMMm": []string{"A", "B", "C#", "D#", "E", "F#", "G#"},
	},
	"bb": {
		"MmMMmMM": []string{"Bb", "C", "Db", "Eb", "F", "Gb", "Ab"},
	},
	"C": {
		"":          []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"},
		"MMmMMMm":   []string{"C", "D", "E", "F", "G", "A", "B"},
		"MmMmMmMm":  []string{"C", "D", "D#", "F", "F#", "G#", "A", "B"},
	},
	"d": {
		"MmMMMmM": []string{"D", "E", "F", "G", "A", "B", "C"},
		"MmMMmAm": []string{"D", "E", "F", "G", "A", "Bb", "Db"},
	},
	"Db": {
		"MMMMMM": []string{"Db", "Eb", "F", "G", "A", "B"},
	},
	"Eb": {
		"MMmMMmM": []string{"Eb", "F", "G", "Ab", "Bb", "C", "Db"},
	},
	"e": {
		"mMMMmMM": []string{"E", "F", "G", "A", "B", "C", "D"},
	},
	"F": {
		"":          []string{"F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"},
		"MMmMMMm":   []string{"F", "G", "A", "Bb", "C", "D", "E"},
	},
	"f#": {
		"MmMMmMM": []string{"F#", "G#", "A", "B", "C#", "D", "E"},
	},
	"G": {
		"MMmMMMm": []string{"G", "A", "B", "C", "D", "E", "F#"},
		"mAMMMmm": []string{"G", "G#", "B", "C#", "D#", "F", "F#"},
	},
	"g": {
		"mMMmMMM": []string{"G", "Ab", "Bb", "C", "Db", "Eb", "F"},
	},
}

func Scale(tonic, interval string) []string {
	if intervals, ok := scales[tonic]; ok {
		if scale, ok := intervals[interval]; ok {
			return scale
		}
	}
	return []string{}
}