package resistorcolorduo

var _colors = [10]string{
	"black", "brown", "red", "orange", "yellow",
	"green", "blue", "violet", "grey", "white",
}

var _colorMap = map[string]int{
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

	first, ok1 := _colorMap[colors[0]]
	if !ok1 {
		return 0
	}
	
	second, ok2 := _colorMap[colors[1]]
	if !ok2 {
		return 0
	}

	return first*10 + second
}