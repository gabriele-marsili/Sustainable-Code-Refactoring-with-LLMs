package resistorcolorduo

// Value should return the resistance value of a resistor with a given colors.
func Value(colors []string) int {
	if len(colors) < 2 {
		return 0
	}

	colorValues := [...]int{
		'k': 0, // black
		'b': 1, // brown
		'r': 2, // red
		'o': 3, // orange
		'y': 4, // yellow
		'g': 5, // green
		'u': 6, // blue
		'v': 7, // violet
		'e': 8, // grey
		'w': 9, // white
	}

	return (colorValues[colors[0][0]] * 10) + colorValues[colors[1][0]]
}