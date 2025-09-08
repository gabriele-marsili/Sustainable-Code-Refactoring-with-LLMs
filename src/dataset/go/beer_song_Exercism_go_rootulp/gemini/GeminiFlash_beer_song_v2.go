package beer

import (
	"fmt"
	"strings"
)

var (
	verse0 = "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n"
	verse1 = "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n"
	verse2 = "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n"
)

func Song() string {
	return verses(99, 0)
}

func Verses(start, stop int) (string, error) {
	if stop < 0 {
		return "", fmt.Errorf("invalid: stop verse number %d can not be negative", stop)
	}
	if start < stop {
		return "", fmt.Errorf("invalid: start %v less than stop %v", start, stop)
	}
	return verses(start, stop), nil
}

func verses(start, stop int) string {
	var sb strings.Builder
	for i := start; i >= stop; i-- {
		sb.WriteString(verse(i))
		sb.WriteString("\n")
	}
	return sb.String()
}

func Verse(n int) string {
	return verse(n)
}

func verse(n int) string {
	switch n {
	case 0:
		return verse0
	case 1:
		return verse1
	case 2:
		return verse2
	default:
		return fmt.Sprintf("%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottle%s of beer on the wall.\n", n, n, n-1, plural(n-1))
	}
}

func plural(n int) string {
	if n == 1 {
		return ""
	}
	return "s"
}