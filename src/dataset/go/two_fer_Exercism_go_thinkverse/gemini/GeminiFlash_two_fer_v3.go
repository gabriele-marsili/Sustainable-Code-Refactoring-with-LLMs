package twofer

func ShareWith(name string) string {
	if name == "" {
		name = "you"
	}

	result := make([]byte, 0, 30+len(name))
	result = append(result, "One for "...)
	result = append(result, ' ')
	result = append(result, name...)
	result = append(result, ", one for me."...)

	return string(result)
}