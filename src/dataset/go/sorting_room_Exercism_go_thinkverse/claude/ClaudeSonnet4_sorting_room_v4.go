package sorting

import (
	"strconv"
)

// DescribeNumber should return a string describing the number.
func DescribeNumber(f float64) string {
	return "This is the number " + formatFloat(f)
}

type NumberBox interface {
	Number() int
}

// DescribeNumberBox should return a string describing the NumberBox.
func DescribeNumberBox(nb NumberBox) string {
	return "This is a box containing the number " + formatFloat(float64(nb.Number()))
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

// ExtractFancyNumber should return the integer value for a FancyNumber
// and 0 if any other FancyNumberBox is supplied.
func ExtractFancyNumber(fnb FancyNumberBox) int {
	if nb, ok := fnb.(FancyNumber); ok {
		if n, err := strconv.Atoi(nb.n); err == nil {
			return n
		}
	}
	return 0
}

// DescribeFancyNumberBox should return a string describing the FancyNumberBox.
func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	if nb, ok := fnb.(FancyNumber); ok {
		if n, err := strconv.Atoi(nb.n); err == nil {
			return "This is a fancy box containing the number " + formatFloat(float64(n))
		}
	}
	return "This is a fancy box containing the number 0.0"
}

// DescribeAnything should return a string describing whatever it contains.
func DescribeAnything(i interface{}) string {
	switch n := i.(type) {
	case int:
		return "This is the number " + formatFloat(float64(n))
	case float64:
		return "This is the number " + formatFloat(n)
	case NumberBox:
		return "This is a box containing the number " + formatFloat(float64(n.Number()))
	case FancyNumberBox:
		return DescribeFancyNumberBox(n)
	default:
		return "Return to sender"
	}
}

func formatFloat(f float64) string {
	return strconv.FormatFloat(f, 'f', 1, 64)
}