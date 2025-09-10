package resistorcolorduo

var _colors = [...]int{
	'k': 0, 'b': 1, 'r': 2, 'o': 3, 'y': 4, 'g': 5, 'u': 6, 'v': 7, 'e': 8, 'w': 9,
}

// Value should return the resistance value of a resistor with a given colors.
func Value(colors []string) int {
	if len(colors) < 2 {
		return 0
	}

	return (_colors[colors[0][0]] * 10) + _colors[colors[1][0]]
}