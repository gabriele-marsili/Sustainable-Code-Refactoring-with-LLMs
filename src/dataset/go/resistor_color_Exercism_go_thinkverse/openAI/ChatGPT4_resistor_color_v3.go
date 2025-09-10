package resistorcolor

var colorList = []string{
	"black", "brown", "red", "orange", "yellow", 
	"green", "blue", "violet", "grey", "white",
}

var colorMap = func() map[string]int {
	m := make(map[string]int, len(colorList))
	for i, color := range colorList {
		m[color] = i
	}
	return m
}()

// Colors should return the list of all colors.
func Colors() []string {
	return append([]string(nil), colorList...)
}

// ColorCode returns the resistance value of the given color.
func ColorCode(color string) int {
	return colorMap[color]
}