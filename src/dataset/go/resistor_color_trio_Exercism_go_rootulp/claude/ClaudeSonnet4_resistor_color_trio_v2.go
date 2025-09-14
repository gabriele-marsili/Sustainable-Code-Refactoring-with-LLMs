package resistorcolortrio

import (
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

var pow10 = [10]int{1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000}

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
	numberOfZeros := colorToResistance[colors[2]]
	ohms := prefix * pow10[numberOfZeros]
	
	if ohms >= giga {
		return strconv.Itoa(ohms/giga) + " gigaohms"
	}
	if ohms >= mega {
		return strconv.Itoa(ohms/mega) + " megaohms"
	}
	if ohms >= kilo {
		return strconv.Itoa(ohms/kilo) + " kiloohms"
	}
	return strconv.Itoa(ohms) + " ohms"
}