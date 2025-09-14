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
	var builder strings.Builder
	builder.WriteString("On the ")
	builder.WriteString(ordinals[day])
	builder.WriteString(" day of Christmas my true love gave to me: ")
	builder.WriteString(clause(day))
	builder.WriteByte('.')
	return builder.String()
}

func ordinal(day int) string {
	return ordinals[day]
}

func clause(day int) string {
	if day == 1 {
		return gifts[1]
	}
	
	var builder strings.Builder
	for i := day; i >= 2; i-- {
		builder.WriteString(gifts[i])
		builder.WriteString(", ")
	}
	builder.WriteString("and ")
	builder.WriteString(gifts[1])
	return builder.String()
}

func gift(day int) string {
	return gifts[day]
}

func Song() string {
	var builder strings.Builder
	for day := 1; day <= 12; day++ {
		if day > 1 {
			builder.WriteByte('\n')
		}
		builder.WriteString(Verse(day))
	}
	return builder.String()
}