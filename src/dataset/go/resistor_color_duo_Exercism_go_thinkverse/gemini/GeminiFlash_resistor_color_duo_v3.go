package resistorcolorduo

var colors = []string{
	"black",
	"brown",
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"violet",
	"grey",
	"white",
}

// Value should return the resistance value of a resistor with a given colors.
func Value(inputColors []string) int {
	if len(inputColors) < 2 {
		return 0
	}

	color1, color2 := inputColors[0], inputColors[1]
	digit1, digit2 := 0, 0

	for i, color := range colors {
		if color == color1 {
			digit1 = i
		}
		if color == color2 {
			digit2 = i
		}
	}

	return (digit1 * 10) + digit2
}