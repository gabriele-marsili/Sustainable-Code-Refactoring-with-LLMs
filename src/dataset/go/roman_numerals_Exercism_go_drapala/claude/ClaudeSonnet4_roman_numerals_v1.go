package romannumerals

import "fmt"

var (
	thousands = [4]string{"", "M", "MM", "MMM"}
	hundreds  = [10]string{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"}
	tens      = [10]string{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"}
	ones      = [10]string{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"}
)

func convert_thousands(digit int) string {
	if digit >= 0 && digit < 4 {
		return thousands[digit]
	}
	return "Invalid digit"
}

func convert_hundreds(digit int) string {
	if digit >= 0 && digit < 10 {
		return hundreds[digit]
	}
	return "Invalid digit"
}

func convert_tens(digit int) string {
	if digit >= 0 && digit < 10 {
		return tens[digit]
	}
	return "Invalid digit"
}

func convert_ones(digit int) string {
	if digit >= 0 && digit < 10 {
		return ones[digit]
	}
	return "Invalid digit"
}

func ToRomanNumeral(input int) (string, error) {
	if input < 1 || input > 3000 {
		return "", fmt.Errorf("number must be between 1 and 3000")
	}

	ones := input % 10
	tens := input / 10 % 10
	hundreds := input / 100 % 10
	thousands := input / 1000

	return thousands[thousands] + hundreds[hundreds] + tens[tens] + ones[ones], nil
}