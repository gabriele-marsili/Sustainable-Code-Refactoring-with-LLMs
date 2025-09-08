package beer

import (
	"errors"
	"strings"
)

func Song() string {
	verses, _ := Verses(99, 0)
	return verses
}

func Verses(start, stop int) (string, error) {
	if start <= stop {
		return "", errors.New("start less than stop")
	}

	var builder strings.Builder
	builder.Grow((start - stop + 1) * 150) // Pre-allocate capacity
	
	for n := start; n >= stop; n-- {
		verse, err := Verse(n)
		if err != nil {
			return "", err
		}
		builder.WriteString(verse)
		builder.WriteByte('\n')
	}
	return builder.String(), nil
}

func Verse(n int) (string, error) {
	if n == 0 {
		return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n", nil
	} else if n >= 1 && n <= 99 {
		var builder strings.Builder
		builder.Grow(120) // Pre-allocate capacity
		
		// First line
		if n == 1 {
			builder.WriteString("1 bottle of beer on the wall, 1 bottle of beer.\n")
		} else {
			builder.WriteString(itoa(n))
			builder.WriteString(" bottles of beer on the wall, ")
			builder.WriteString(itoa(n))
			builder.WriteString(" bottles of beer.\n")
		}
		
		// Second line
		if n == 1 {
			builder.WriteString("Take it down and pass it around, no more bottles of beer on the wall.\n")
		} else if n == 2 {
			builder.WriteString("Take one down and pass it around, 1 bottle of beer on the wall.\n")
		} else {
			builder.WriteString("Take one down and pass it around, ")
			builder.WriteString(itoa(n - 1))
			builder.WriteString(" bottles of beer on the wall.\n")
		}
		
		return builder.String(), nil
	}
	return "", errors.New("n out of bounds")
}

func itoa(n int) string {
	if n == 0 {
		return "0"
	}
	
	var buf [10]byte
	i := len(buf)
	
	for n > 0 {
		i--
		buf[i] = byte('0' + n%10)
		n /= 10
	}
	
	return string(buf[i:])
}