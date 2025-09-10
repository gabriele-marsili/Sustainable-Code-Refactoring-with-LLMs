package resistorcolor

var colorList = []string{"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"}

// Colors should return the list of all colors.
func Colors() []string {
	return colorList
}

// ColorCode returns the resistance value of the given color.
func ColorCode(color string) int {
	for i, c := range colorList {
		if c == color {
			return i
		}
	}
	return 0
}