package twelve

import (
	"fmt"
	"strings"
)

var ordinals = []string{"first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"}
var gifts = []string{
	"a Partridge in a Pear Tree",
	"two Turtle Doves",
	"three French Hens",
	"four Calling Birds",
	"five Gold Rings",
	"six Geese-a-Laying",
	"seven Swans-a-Swimming",
	"eight Maids-a-Milking",
	"nine Ladies Dancing",
	"ten Lords-a-Leaping",
	"eleven Pipers Piping",
	"twelve Drummers Drumming",
}

func Verse(day int) string {
	return fmt.Sprintf("On the %s day of Christmas my true love gave to me: %s.", ordinals[day-1], clause(day))
}

func clause(day int) string {
	var sb strings.Builder
	for i := day; i >= 1; i-- {
		sb.WriteString(gift(i))
		if i > 1 {
			if i == 2 {
				sb.WriteString(", and ")
			} else {
				sb.WriteString(", ")
			}
		}
	}
	return sb.String()
}

func gift(day int) string {
	if day == 1 {
		return "a Partridge in a Pear Tree"
	}
	return gifts[day-1]
}

func Song() string {
	var sb strings.Builder
	for day := 1; day <= 12; day++ {
		sb.WriteString(Verse(day))
		if day < 12 {
			sb.WriteString("\n")
		}
	}
	return sb.String()
}