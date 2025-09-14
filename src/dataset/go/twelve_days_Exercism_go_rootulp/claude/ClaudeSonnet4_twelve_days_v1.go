package twelve

import (
	"strings"
)

var ordinals = [13]string{
	"", "first", "second", "third", "fourth", "fifth", "sixth",
	"seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
}

var gifts = [13]string{
	"", "a Partridge in a Pear Tree", "two Turtle Doves", "three French Hens",
	"four Calling Birds", "five Gold Rings", "six Geese-a-Laying",
	"seven Swans-a-Swimming", "eight Maids-a-Milking", "nine Ladies Dancing",
	"ten Lords-a-Leaping", "eleven Pipers Piping", "twelve Drummers Drumming",
}

func Verse(day int) string {
	var sb strings.Builder
	sb.WriteString("On the ")
	sb.WriteString(ordinals[day])
	sb.WriteString(" day of Christmas my true love gave to me: ")
	sb.WriteString(clause(day))
	sb.WriteString(".")
	return sb.String()
}

func ordinal(day int) string {
	return ordinals[day]
}

func clause(day int) string {
	if day == 1 {
		return gifts[1]
	}
	
	var sb strings.Builder
	for i := day; i >= 2; i-- {
		sb.WriteString(gifts[i])
		sb.WriteString(", ")
	}
	sb.WriteString("and ")
	sb.WriteString(gifts[1])
	return sb.String()
}

func gift(day int) string {
	return gifts[day]
}

func Song() string {
	var sb strings.Builder
	for day := 1; day <= 12; day++ {
		if day > 1 {
			sb.WriteString("\n")
		}
		sb.WriteString(Verse(day))
	}
	return sb.String()
}