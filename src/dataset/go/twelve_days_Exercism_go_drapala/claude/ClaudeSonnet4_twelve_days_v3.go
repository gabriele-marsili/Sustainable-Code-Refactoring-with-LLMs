package twelve

import (
	"fmt"
	"strings"
)

var (
	ordinals = [12]string{
		"first", "second", "third", "fourth", "fifth", "sixth",
		"seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
	}
	
	gifts = [12]string{
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
	
	verses [12]string
)

func init() {
	var builder strings.Builder
	for i := 0; i < 12; i++ {
		builder.Reset()
		builder.WriteString("On the ")
		builder.WriteString(ordinals[i])
		builder.WriteString(" day of Christmas my true love gave to me: ")
		
		for j := i; j >= 0; j-- {
			if j < i && j == 0 {
				builder.WriteString("and ")
			} else if j < i {
				builder.WriteString(", ")
			}
			builder.WriteString(gifts[j])
		}
		builder.WriteByte('.')
		verses[i] = builder.String()
	}
}

func Verse(i int) string {
	if i < 1 || i > 12 {
		return fmt.Sprintf("i = %d not in range", i)
	}
	return verses[i-1]
}

func Song() string {
	var builder strings.Builder
	totalLen := 0
	for i := 0; i < 12; i++ {
		totalLen += len(verses[i])
	}
	totalLen += 11
	builder.Grow(totalLen)
	
	for i := 0; i < 12; i++ {
		if i > 0 {
			builder.WriteByte('\n')
		}
		builder.WriteString(verses[i])
	}
	return builder.String()
}