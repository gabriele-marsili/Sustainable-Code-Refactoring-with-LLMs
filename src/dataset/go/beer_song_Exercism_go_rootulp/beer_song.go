package beer

import (
	"fmt"
	"strings"
)

func Song() string {
	result, err := Verses(99, 0)
	if err != nil {
		panic(err)
	}
	return result
}

func Verses(start, stop int) (output string, err error) {
	if stop < 0 {
		return "", fmt.Errorf("invalid: stop verse number %d can not be negative", stop)
	}
	if start < stop {
		return "", fmt.Errorf("invalid: start %v less than stop %v", start, stop)
	}
	
	var builder strings.Builder
	builder.Grow((start - stop + 1) * 150)
	
	for i := start; i >= stop; i-- {
		verse, err := Verse(i)
		if err != nil {
			return "", err
		}
		builder.WriteString(verse)
		builder.WriteByte('\n')
	}
	return builder.String(), nil
}

func Verse(n int) (string, error) {
	if n > 99 {
		return "", fmt.Errorf("invalid verse number: %d", n)
	}
	
	switch n {
	case 0:
		return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n", nil
	case 1:
		return "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n", nil
	case 2:
		return "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n", nil
	default:
		var builder strings.Builder
		builder.Grow(120)
		
		nStr := itoa(n)
		n1Str := itoa(n - 1)
		
		builder.WriteString(nStr)
		builder.WriteString(" bottles of beer on the wall, ")
		builder.WriteString(nStr)
		builder.WriteString(" bottles of beer.\nTake one down and pass it around, ")
		builder.WriteString(n1Str)
		builder.WriteString(" bottles of beer on the wall.\n")
		
		return builder.String(), nil
	}
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