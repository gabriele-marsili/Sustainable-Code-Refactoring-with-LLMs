package twelve

import (
	"fmt"
	"strings"
)

var (
	ordinals = []string{
		"first", "second", "third", "fourth", "fifth", "sixth",
		"seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
	}

	gifts = []string{
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
)

func Verse(day int) string {
	return fmt.Sprintf("On the %s day of Christmas my true love gave to me: %s.", ordinals[day-1], clause(day))
}

func clause(day int) string {
	clauses := make([]string, day)
	for i := day - 1; i >= 0; i-- {
		if day > 1 && i == 0 {
			clauses[day-1-i] = "and " + gifts[i]
		} else {
			clauses[day-1-i] = gifts[i]
		}
	}
	return strings.Join(clauses, ", ")
}

func Song() string {
	verses := make([]string, 12)
	for day := 1; day <= 12; day++ {
		verses[day-1] = Verse(day)
	}
	return strings.Join(verses, "\n")
}