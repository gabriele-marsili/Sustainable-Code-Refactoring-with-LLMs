package twelve

import (
	"fmt"
	"strings"
)

var (
	days = []string{
		"first", "second", "third", "fourth", "fifth", "sixth",
		"seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
	}
	gifts = []string{
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
)

func Verse(i int) string {
	if i < 1 || i > 12 {
		return fmt.Sprintf("i = %d not in range", i)
	}

	verse := fmt.Sprintf("On the %s day of Christmas my true love gave to me: ", days[i-1])
	for j := i - 1; j >= 0; j-- {
		verse += gifts[j]
	}
	return verse
}

func Song() string {
	verses := make([]string, 12)
	for i := 1; i <= 12; i++ {
		verses[i-1] = Verse(i)
	}
	return strings.Join(verses, "\n")
}