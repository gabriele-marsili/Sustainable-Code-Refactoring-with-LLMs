package accumulate

func Accumulate(items []string, f func(string) string) []string {
	result := make([]string, len(items))
	for i, item := range items {
		result[i] = f(item)
	}
	return result
}