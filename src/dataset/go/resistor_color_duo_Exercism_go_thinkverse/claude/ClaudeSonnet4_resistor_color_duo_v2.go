package resistorcolorduo

var _colors = [10]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

var colorMap = map[string]int{
	"black":  0,
	"brown":  1,
	"red":    2,
	"orange": 3,
	"yellow": 4,
	"green":  5,
	"blue":   6,
	"violet": 7,
	"grey":   8,
	"white":  9,
}

// Value should return the resistance value of a resistor with a given colors.
func Value(colors []string) int {
	if len(colors) < 2 {
		return 0
	}

	return (colorMap[colors[0]] << 3) + (colorMap[colors[0]] << 1) + colorMap[colors[1]]
}