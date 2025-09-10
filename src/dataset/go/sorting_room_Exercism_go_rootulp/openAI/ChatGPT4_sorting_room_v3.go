package sorting

import (
	"fmt"
	"strconv"
)

func DescribeNumber(f float64) string {
	return "This is the number " + strconv.FormatFloat(f, 'f', 1, 64)
}

type NumberBox interface {
	Number() int
}

func DescribeNumberBox(nb NumberBox) string {
	return "This is a box containing the number " + strconv.FormatFloat(float64(nb.Number()), 'f', 1, 64)
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
	if result, err := strconv.Atoi(fnb.Value()); err == nil {
		return result
	}
	return 0
}

func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	return "This is a fancy box containing the number " + strconv.FormatFloat(float64(ExtractFancyNumber(fnb)), 'f', 1, 64)
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
		return "Return to sender"
	}
}