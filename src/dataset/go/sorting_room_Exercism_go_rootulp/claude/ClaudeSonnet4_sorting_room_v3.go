package sorting

import (
	"strconv"
	"strings"
)

var (
	numberPrefix = "This is the number "
	boxPrefix    = "This is a box containing the number "
	fancyPrefix  = "This is a fancy box containing the number "
	returnMsg    = "Return to sender"
)

func DescribeNumber(f float64) string {
	var buf strings.Builder
	buf.Grow(32)
	buf.WriteString(numberPrefix)
	buf.WriteString(formatFloat(f))
	return buf.String()
}

type NumberBox interface {
	Number() int
}

func DescribeNumberBox(nb NumberBox) string {
	var buf strings.Builder
	buf.Grow(48)
	buf.WriteString(boxPrefix)
	buf.WriteString(formatFloat(float64(nb.Number())))
	return buf.String()
}

type FancyNumber struct {
	n string
}

func (i FancyNumber) Value() string {
	return i.n
}

type FancyNumberBox interface {
	Value() string
}

func ExtractFancyNumber(fnb FancyNumberBox) int {
	result, err := strconv.Atoi(fnb.Value())
	if err != nil {
		return 0
	}
	return result
}

func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	var buf strings.Builder
	buf.Grow(56)
	buf.WriteString(fancyPrefix)
	buf.WriteString(formatFloat(float64(ExtractFancyNumber(fnb))))
	return buf.String()
}

func DescribeAnything(i interface{}) string {
	switch v := i.(type) {
	case int:
		return DescribeNumber(float64(v))
	case float64:
		return DescribeNumber(v)
	case NumberBox:
		return DescribeNumberBox(v)
	case FancyNumberBox:
		return DescribeFancyNumberBox(v)
	default:
		return returnMsg
	}
}

func formatFloat(f float64) string {
	return strconv.FormatFloat(f, 'f', 1, 64)
}