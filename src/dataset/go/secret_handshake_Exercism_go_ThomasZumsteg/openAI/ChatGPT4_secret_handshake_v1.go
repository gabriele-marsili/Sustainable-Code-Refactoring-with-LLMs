package secret

var steps = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code int) []string {
	if code <= 0 {
		return nil
	}

	handshake := make([]string, 0, len(steps))
	reverseOrder := code&(1<<4) != 0

	for i := 0; i < len(steps); i++ {
		if code&(1<<i) != 0 {
			if reverseOrder {
				handshake = append([]string{steps[i]}, handshake...)
			} else {
				handshake = append(handshake, steps[i])
			}
		}
	}

	return handshake
}