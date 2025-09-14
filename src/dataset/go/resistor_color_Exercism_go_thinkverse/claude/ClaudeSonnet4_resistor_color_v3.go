package resistorcolor

var colors = map[string]int{
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

var colorsList = []string{
	"black", "brown", "red", "orange", "yellow",
	"green", "blue", "violet", "grey", "white",
}

func Colors() []string {
	return colorsList
}

func ColorCode(color string) int {
	return colors[color]
}