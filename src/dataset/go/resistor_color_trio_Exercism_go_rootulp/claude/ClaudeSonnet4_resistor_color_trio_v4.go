package resistorcolortrio

import "fmt"

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

var powers = [10]int{1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000}

const (
	kilo = 1_000
	mega = 1_000_000
	giga = 1_000_000_000
)

func Label(colors []string) string {
	prefix := colorToResistance[colors[0]]*10 + colorToResistance[colors[1]]
	ohms := prefix * powers[colorToResistance[colors[2]]]
	
	if ohms >= giga {
		return fmt.Sprintf("%d gigaohms", ohms/giga)
	}
	if ohms >= mega {
		return fmt.Sprintf("%d megaohms", ohms/mega)
	}
	if ohms >= kilo {
		return fmt.Sprintf("%d kiloohms", ohms/kilo)
	}
	return fmt.Sprintf("%d ohms", ohms)
}

func format(ohms int) string {
	if ohms > giga {
		return fmt.Sprintf("%v gigaohms", ohms/giga)
	}
	if ohms > mega {
		return fmt.Sprintf("%v megaohms", ohms/mega)
	}
	if ohms > kilo {
		return fmt.Sprintf("%v kiloohms", ohms/kilo)
	}
	return fmt.Sprintf("%v ohms", ohms)
}

func trimExtraColors(colors []string) (trimmed []string) {
	return colors[:3]
}

func getValue(resistances []int) (value int) {
	prefix := resistances[0]*10 + resistances[1]
	return prefix * powers[resistances[2]]
}

func decodeColors(colors []string) (decoded []int) {
	decoded = make([]int, 3)
	decoded[0] = colorToResistance[colors[0]]
	decoded[1] = colorToResistance[colors[1]]
	decoded[2] = colorToResistance[colors[2]]
	return decoded
}

func decode(color string) (decoded int) {
	return colorToResistance[color]
}