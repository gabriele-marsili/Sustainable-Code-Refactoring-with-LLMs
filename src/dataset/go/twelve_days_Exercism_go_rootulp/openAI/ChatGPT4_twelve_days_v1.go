package twelve

import (
	"fmt"
	"strings"
)

var ordinals = [...]string{
	"", "first", "second", "third", "fourth", "fifth",
	"sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
}

var gifts = [...]string{
	"", "a Partridge in a Pear Tree", "two Turtle Doves", "three French Hens",
	"four Calling Birds", "five Gold Rings", "six Geese-a-Laying",
	"seven Swans-a-Swimming", "eight Maids-a-Milking", "nine Ladies Dancing",
	"ten Lords-a-Leaping", "eleven Pipers Piping", "twelve Drummers Drumming",
}

func Verse(day int) string {
	return fmt.Sprintf("On the %v day of Christmas my true love gave to me: %s.", ordinal(day), clause(day))
}

func ordinal(day int) string {
	if day >= 1 && day < len(ordinals) {
		return ordinals[day]
	}
	return ""
}

func clause(day int) string {
	clauses := make([]string, 0, day)
	for i := day; i >= 1; i-- {
		if day > 1 && i == 1 {
			clauses = append(clauses, "and "+gift(i))
		} else {
			clauses = append(clauses, gift(i))
		}
	}
	return strings.Join(clauses, ", ")
}

func gift(day int) string {
	if day >= 1 && day < len(gifts) {
		return gifts[day]
	}
	return ""
}

func Song() string {
	verses := make([]string, 0, 12)
	for day := 1; day <= 12; day++ {
		verses = append(verses, Verse(day))
	}
	return strings.Join(verses, "\n")
}
