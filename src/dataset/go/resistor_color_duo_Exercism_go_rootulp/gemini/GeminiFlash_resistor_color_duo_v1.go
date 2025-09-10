package resistorcolorduo

var colorToResistance = map[string]int{
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
		return 0 // Or handle the error as appropriate
	}

	resistance1, ok1 := colorToResistance[colors[0]]
	resistance2, ok2 := colorToResistance[colors[1]]

	if !ok1 || !ok2 {
		return 0 // Or handle the error as appropriate
	}

	return resistance1*10 + resistance2
}