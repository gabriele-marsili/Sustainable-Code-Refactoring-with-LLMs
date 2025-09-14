package romannumerals

import "fmt"

var (
	thousandsMap = [4]string{"", "M", "MM", "MMM"}
	hundredsMap  = [10]string{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"}
	tensMap      = [10]string{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"}
	onesMap      = [10]string{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"}
)

func convert_thousands(digit int) string {
	if digit >= 0 && digit < len(thousandsMap) {
		return thousandsMap[digit]
	}
	return "Invalid digit"
}

func convert_hundreds(digit int) string {
	if digit >= 0 && digit < len(hundredsMap) {
		return hundredsMap[digit]
	}
	return "Invalid digit"
}

func convert_tens(digit int) string {
	if digit >= 0 && digit < len(tensMap) {
		return tensMap[digit]
	}
	return "Invalid digit"
}

func convert_ones(digit int) string {
	if digit >= 0 && digit < len(onesMap) {
		return onesMap[digit]
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
	thousands := input / 1000 % 10

	return thousandsMap[thousands] + hundredsMap[hundreds] + tensMap[tens] + onesMap[ones], nil
}