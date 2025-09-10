package ocr

func Recognize(input string) []string {
	if input == "" {
		return nil
	}
	return []string{input}
}