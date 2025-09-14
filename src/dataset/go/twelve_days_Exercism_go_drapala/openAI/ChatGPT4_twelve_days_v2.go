package twelve

import (
	"strings"
)

var days = []string{
	"first", "second", "third", "fourth", "fifth", "sixth",
	"seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
}

var gifts = []string{
	"a Partridge in a Pear Tree.",
	"two Turtle Doves, and ",
	"three French Hens, ",
	"four Calling Birds, ",
	"five Gold Rings, ",
	"six Geese-a-Laying, ",
	"seven Swans-a-Swimming, ",
	"eight Maids-a-Milking, ",
	"nine Ladies Dancing, ",
	"ten Lords-a-Leaping, ",
	"eleven Pipers Piping, ",
	"twelve Drummers Drumming, ",
}

func Verse(i int) string {
	if i < 1 || i > 12 {
		return ""
	}
	var sb strings.Builder
	sb.WriteString("On the ")
	sb.WriteString(days[i-1])
	sb.WriteString(" day of Christmas my true love gave to me: ")
	for j := i - 1; j >= 0; j-- {
		sb.WriteString(gifts[j])
	}
	return sb.String()
}

func Song() string {
	var sb strings.Builder
	for i := 1; i <= 12; i++ {
		if i > 1 {
			sb.WriteString("\n")
		}
		sb.WriteString(Verse(i))
	}
	return sb.String()
}