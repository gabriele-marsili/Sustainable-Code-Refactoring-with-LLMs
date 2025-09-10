package sorting

import (
	"strconv"
)

// DescribeNumber should return a string describing the number.
func DescribeNumber(f float64) string {
	return "This is the number " + strconv.FormatFloat(f, 'f', 1, 64)
}

type NumberBox interface {
	Number() int
}

// DescribeNumberBox should return a string describing the NumberBox.
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

// ExtractFancyNumber should return the integer value for a FancyNumber
// and 0 if any other FancyNumberBox is supplied.
func ExtractFancyNumber(fnb FancyNumberBox) int {
	if nb, ok := fnb.(FancyNumber); ok {
		n, _ := strconv.Atoi(nb.Value())
		return n
	}
	return 0
}

// DescribeFancyNumberBox should return a string describing the FancyNumberBox.
func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	return "This is a fancy box containing the number " + strconv.FormatFloat(float64(ExtractFancyNumber(fnb)), 'f', 1, 64)
}

// DescribeAnything should return a string describing whatever it contains.
func DescribeAnything(i interface{}) string {
	switch n := i.(type) {
	case int:
		return DescribeNumber(float64(n))
	case float64:
		return DescribeNumber(n)
	case NumberBox:
		return DescribeNumberBox(n)
	case FancyNumberBox:
		return DescribeFancyNumberBox(n)
	default:
		return "Return to sender"
	}
}