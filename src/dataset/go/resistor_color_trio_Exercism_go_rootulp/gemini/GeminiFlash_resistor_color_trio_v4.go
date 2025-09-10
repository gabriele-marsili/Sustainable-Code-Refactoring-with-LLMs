package resistorcolortrio

import (
	"fmt"
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

const (
	kilo = 1_000
	mega = 1_000_000
	giga = 1_000_000_000
)

// Label describes the resistance value given the colors of a resistor.
// The label is a string with a resistance value with an unit appended
// (e.g. "33 ohms", "470 kiloohms").
func Label(colors []string) string {
	prefix := colorToResistance[colors[0]]*10 + colorToResistance[colors[1]]
	ohms := prefix
	zeros := colorToResistance[colors[2]]
	for i := 0; i < zeros; i++ {
		ohms *= 10
	}

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