package twelve

import (
	"fmt"
	"strings"
)

var (
	ordinals = [13]string{"", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"}
	gifts = [13]string{"", "a Partridge in a Pear Tree", "two Turtle Doves", "three French Hens", "four Calling Birds", "five Gold Rings", "six Geese-a-Laying", "seven Swans-a-Swimming", "eight Maids-a-Milking", "nine Ladies Dancing", "ten Lords-a-Leaping", "eleven Pipers Piping", "twelve Drummers Drumming"}
	verses [13]string
)

func init() {
	var builder strings.Builder
	for day := 1; day <= 12; day++ {
		builder.Reset()
		builder.WriteString("On the ")
		builder.WriteString(ordinals[day])
		builder.WriteString(" day of Christmas my true love gave to me: ")
		
		for gift := day; gift >= 1; gift-- {
			if gift == 1 && day > 1 {
				builder.WriteString("and ")
			}
			builder.WriteString(gifts[gift])
			if gift > 1 {
				builder.WriteString(", ")
			}
		}
		builder.WriteByte('.')
		verses[day] = builder.String()
	}
}

func Verse(i int) string {
	if i >= 1 && i <= 12 {
		return verses[i]
	}
	return fmt.Sprintf("i = %d not in range", i)
}

func Song() string {
	var builder strings.Builder
	totalLen := 0
	for i := 1; i <= 12; i++ {
		totalLen += len(verses[i]) + 1
	}
	builder.Grow(totalLen - 1)
	
	for i := 1; i <= 12; i++ {
		if i > 1 {
			builder.WriteByte('\n')
		}
		builder.WriteString(verses[i])
	}
	return builder.String()
}