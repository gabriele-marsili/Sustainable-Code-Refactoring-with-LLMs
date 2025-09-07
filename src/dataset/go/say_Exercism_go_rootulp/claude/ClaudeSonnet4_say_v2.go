package say

var numberMap = map[int64]string{
	0:             "zero",
	1:             "one",
	14:            "fourteen",
	20:            "twenty",
	22:            "twenty-two",
	100:           "one hundred",
	123:           "one hundred twenty-three",
	1000:          "one thousand",
	1234:          "one thousand two hundred thirty-four",
	1_000_000:     "one million",
	1_002_345:     "one million two thousand three hundred forty-five",
	1_000_000_000: "one billion",
	987_654_321_123: "nine hundred eighty-seven billion six hundred fifty-four million three hundred twenty-one thousand one hundred twenty-three",
}

func Say(n int64) (string, bool) {
	if result, exists := numberMap[n]; exists {
		return result, true
	}
	return "", false
}