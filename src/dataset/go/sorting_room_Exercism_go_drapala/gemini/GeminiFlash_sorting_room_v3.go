package sorting

import (
	"strconv"
)

// DescribeNumber should return a string describing the number.
func DescribeNumber(f float64) string {
	buf := make([]byte, 0, 32)
	buf = append(buf, "This is the number "...)
	buf = strconv.AppendFloat(buf, f, 'f', 1, 64)
	return string(buf)
}

type NumberBox interface {
	Number() int
}

// DescribeNumberBox should return a string describing the NumberBox.
func DescribeNumberBox(nb NumberBox) string {
	buf := make([]byte, 0, 64)
	buf = append(buf, "This is a box containing the number "...)
	buf = strconv.AppendFloat(buf, float64(nb.Number()), 'f', 1, 64)
	return string(buf)
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
	i, err := strconv.Atoi(fnb.Value())
	if err != nil {
		return 0
	}
	return i
}

// DescribeFancyNumberBox should return a string describing the FancyNumberBox.
func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	buf := make([]byte, 0, 64)
	buf = append(buf, "This is a fancy box containing the number "...)
	i := ExtractFancyNumber(fnb)
	buf = strconv.AppendFloat(buf, float64(i), 'f', 1, 64)
	return string(buf)
}

// DescribeAnything should return a string describing whatever it contains.
func DescribeAnything(i interface{}) string {
	switch v := i.(type) {
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