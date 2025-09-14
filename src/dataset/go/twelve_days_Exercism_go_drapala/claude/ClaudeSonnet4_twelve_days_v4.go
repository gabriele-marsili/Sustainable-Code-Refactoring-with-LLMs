package twelve

import (
	"fmt"
	"strings"
)

var (
	ordinals = [13]string{
		"", "first", "second", "third", "fourth", "fifth", "sixth",
		"seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
	}
	
	gifts = [13]string{
		"", "a Partridge in a Pear Tree", "two Turtle Doves", "three French Hens",
		"four Calling Birds", "five Gold Rings", "six Geese-a-Laying",
		"seven Swans-a-Swimming", "eight Maids-a-Milking", "nine Ladies Dancing",
		"ten Lords-a-Leaping", "eleven Pipers Piping", "twelve Drummers Drumming",
	}
	
	verses [13]string
)

func init() {
	var sb strings.Builder
	sb.Grow(1024)
	
	for day := 1; day <= 12; day++ {
		sb.Reset()
		sb.WriteString("On the ")
		sb.WriteString(ordinals[day])
		sb.WriteString(" day of Christmas my true love gave to me: ")
		
		for i := day; i >= 1; i-- {
			if i == 1 && day > 1 {
				sb.WriteString("and ")
			}
			sb.WriteString(gifts[i])
			if i > 1 {
				sb.WriteString(", ")
			}
		}
		sb.WriteByte('.')
		verses[day] = sb.String()
	}
}

func Verse(i int) string {
	if i >= 1 && i <= 12 {
		return verses[i]
	}
	return fmt.Sprintf("i = %d not in range", i)
}

func Song() string {
	var sb strings.Builder
	sb.Grow(2048)
	
	for i := 1; i <= 12; i++ {
		if i > 1 {
			sb.WriteByte('\n')
		}
		sb.WriteString(verses[i])
	}
	return sb.String()
}