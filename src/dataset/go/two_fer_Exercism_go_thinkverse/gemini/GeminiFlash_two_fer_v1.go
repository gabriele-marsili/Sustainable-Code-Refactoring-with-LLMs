package twofer

// Iteration 3 with string builder:
//
// 10000000 ~115 ns/op 0 allocs/op
func ShareWith(name string) string {
	if name == "" {
		name = "you"
	}

	var result string
	result = "One for " + name + ", one for me."
	return result
}