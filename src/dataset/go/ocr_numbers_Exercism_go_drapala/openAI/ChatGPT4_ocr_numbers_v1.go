package ocr

import (
	"strings"
)

func Recognize(input string) []string {
	if input == "" {
		return nil
	}
	return strings.Fields(input)
}