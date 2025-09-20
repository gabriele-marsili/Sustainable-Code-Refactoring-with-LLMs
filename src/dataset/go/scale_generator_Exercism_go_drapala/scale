package scale

var scales = map[string]map[string][]string{
	"A": {
		"MMAMA":    {"A", "B", "C#", "E", "F#"},
	},
	"a": {
		"MMMmMMm":  {"A", "B", "C#", "D#", "E", "F#", "G#"},
	},
	"bb": {
		"MmMMmMM":  {"Bb", "C", "Db", "Eb", "F", "Gb", "Ab"},
	},
	"C": {
		"":         {"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"},
		"MMmMMMm":  {"C", "D", "E", "F", "G", "A", "B"},
		"MmMmMmMm": {"C", "D", "D#", "F", "F#", "G#", "A", "B"},
	},
	"d": {
		"MmMMMmM":  {"D", "E", "F", "G", "A", "B", "C"},
		"MmMMmAm":  {"D", "E", "F", "G", "A", "Bb", "Db"},
	},
	"Db": {
		"MMMMMM":   {"Db", "Eb", "F", "G", "A", "B"},
	},
	"Eb": {
		"MMmMMmM":  {"Eb", "F", "G", "Ab", "Bb", "C", "Db"},
	},
	"e": {
		"mMMMmMM":  {"E", "F", "G", "A", "B", "C", "D"},
	},
	"F": {
		"":         {"F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"},
		"MMmMMMm":  {"F", "G", "A", "Bb", "C", "D", "E"},
	},
	"f#": {
		"MmMMmMM":  {"F#", "G#", "A", "B", "C#", "D", "E"},
	},
	"G": {
		"MMmMMMm":  {"G", "A", "B", "C", "D", "E", "F#"},
		"mAMMMmm":  {"G", "G#", "B", "C#", "D#", "F", "F#"},
	},
	"g": {
		"mMMmMMM":  {"G", "Ab", "Bb", "C", "Db", "Eb", "F"},
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