package resistorcolorduo

// Value should return the resistance value of a resistor with a given colors.
func Value(colors []string) int {
	if len(colors) < 2 {
		return 0
	}

	colorValues := [...]int{
		'k': 0, 'b': 1, 'r': 2, 'o': 3, 'y': 4, 'g': 5, 'u': 6, 'v': 7, 'e': 8, 'w': 9,
	}

	return colorValues[colors[0][0]]*10 + colorValues[colors[1][0]]
}