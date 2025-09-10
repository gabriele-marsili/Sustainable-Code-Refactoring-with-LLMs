package resistorcolorduo

var _colors = [10]string{"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"}

// Value should return the resistance value of a resistor with a given colors.
func Value(colors []string) int {
	if len(colors) < 2 {
		return 0
	}

	colorMap := func(color string) int {
		for i, c := range _colors {
			if c == color {
				return i
			}
		}
		return 0
	}

	return (colorMap(colors[0]) * 10) + colorMap(colors[1])
}