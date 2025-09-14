package resistorcolortrio

import (
	"fmt"
	"strconv"
)

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
	colors = trimExtraColors(colors)
	decoded := decodeColors(colors)
	ohms := getValue(decoded)
	return format(ohms)
}

func format(ohms int) string {
	if ohms >= giga {
		if ohms%giga == 0 {
			return strconv.Itoa(ohms/giga) + " gigaohms"
		}
		return fmt.Sprintf("%v gigaohms", ohms/giga)
	}
	if ohms >= mega {
		if ohms%mega == 0 {
			return strconv.Itoa(ohms/mega) + " megaohms"
		}
		return fmt.Sprintf("%v megaohms", ohms/mega)
	}
	if ohms >= kilo {
		if ohms%kilo == 0 {
			return strconv.Itoa(ohms/kilo) + " kiloohms"
		}
		return fmt.Sprintf("%v kiloohms", ohms/kilo)
	}
	return strconv.Itoa(ohms) + " ohms"
}

func trimExtraColors(colors []string) []string {
	return colors[:3]
}

func getValue(resistances []int) int {
	prefix := resistances[0]*10 + resistances[1]
	return prefix * powers[resistances[2]]
}

func decodeColors(colors []string) []int {
	decoded := make([]int, 3)
	decoded[0] = colorToResistance[colors[0]]
	decoded[1] = colorToResistance[colors[1]]
	decoded[2] = colorToResistance[colors[2]]
	return decoded
}

func decode(color string) int {
	return colorToResistance[color]
}