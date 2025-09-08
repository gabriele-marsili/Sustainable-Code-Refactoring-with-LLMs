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
	builder.Grow((start - stop + 1) * 200)
	
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

func nBottles(n int) string {
	bottle := "bottles"
	if n == 1 {
		bottle = "bottle"
	}
	
	var builder strings.Builder
	builder.Grow(60)
	builder.WriteString(itoa(n))
	builder.WriteByte(' ')
	builder.WriteString(bottle)
	builder.WriteString(" of beer on the wall, ")
	builder.WriteString(itoa(n))
	builder.WriteByte(' ')
	builder.WriteString(bottle)
	builder.WriteString(" of beer.\n")
	return builder.String()
}

func nTakedown(n int) string {
	bottle := "bottles"
	if n == 2 {
		bottle = "bottle"
	}
	
	oneorit := "one"
	if n == 1 {
		oneorit = "it"
	}

	var numleft string
	if n == 1 {
		numleft = "no more"
	} else {
		numleft = itoa(n - 1)
	}
	
	var builder strings.Builder
	builder.Grow(80)
	builder.WriteString("Take ")
	builder.WriteString(oneorit)
	builder.WriteString(" down and pass it around, ")
	builder.WriteString(numleft)
	builder.WriteByte(' ')
	builder.WriteString(bottle)
	builder.WriteString(" of beer on the wall.\n")
	return builder.String()
}

func Verse(n int) (string, error) {
	if n == 0 {
		return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n", nil
	} else if n >= 1 && n <= 99 {
		var builder strings.Builder
		builder.Grow(150)
		builder.WriteString(nBottles(n))
		builder.WriteString(nTakedown(n))
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