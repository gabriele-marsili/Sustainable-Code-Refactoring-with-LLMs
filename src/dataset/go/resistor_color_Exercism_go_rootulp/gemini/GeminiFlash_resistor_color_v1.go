package resistorcolor

var colorCodes = map[string]int{
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

// Colors returns the list of all colors.
func Colors() []string {
	colors := make([]string, 0, len(colorCodes))
	for color := range colorCodes {
		colors = append(colors, color)
	}
	return colors
}

// ColorCode returns the resistance value of the given color.
func ColorCode(color string) int {
	code, ok := colorCodes[color]
	if !ok {
		panic("color not supported")
	}
	return code
}