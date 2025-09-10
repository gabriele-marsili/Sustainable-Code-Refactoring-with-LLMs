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
	return fmt.Sprintf("On the %s day of Christmas my true love gave to me: %s.", ordinal(day), clause(day))
}

func ordinal(day int) string {
	return ordinals[day-1]
}

func clause(day int) string {
	clauses := make([]string, day)
	for i := day; i >= 1; i-- {
		if day > 1 && i == 1 {
			clauses[day-i] = "and " + gift(i)
		} else {
			clauses[day-i] = gift(i)
		}
	}
	return strings.Join(clauses, ", ")
}

func gift(day int) string {
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