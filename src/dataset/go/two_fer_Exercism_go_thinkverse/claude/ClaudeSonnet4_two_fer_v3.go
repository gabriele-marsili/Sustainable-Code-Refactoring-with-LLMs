package twofer

const defaultMessage = "One for you, one for me."

func ShareWith(name string) string {
	if name == "" {
		return defaultMessage
	}

	return "One for " + name + ", one for me."
}