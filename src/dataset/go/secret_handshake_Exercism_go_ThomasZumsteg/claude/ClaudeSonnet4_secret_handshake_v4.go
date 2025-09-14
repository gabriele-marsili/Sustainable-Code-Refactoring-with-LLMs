package secret

var steps = [4]string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code int) []string {
	if code <= 0 {
		return nil
	}

	var handshake []string
	var count int
	
	for i := 0; i < 4; i++ {
		if code&(1<<i) != 0 {
			count++
		}
	}
	
	if count == 0 {
		if code&16 != 0 {
			return nil
		}
		return nil
	}
	
	handshake = make([]string, 0, count)
	
	if code&16 != 0 {
		for i := 3; i >= 0; i-- {
			if code&(1<<i) != 0 {
				handshake = append(handshake, steps[i])
			}
		}
	} else {
		for i := 0; i < 4; i++ {
			if code&(1<<i) != 0 {
				handshake = append(handshake, steps[i])
			}
		}
	}
	
	return handshake
}

func reverse(strings []string) {
	for i, j := 0, len(strings)-1; i < j; i, j = i+1, j-1 {
		strings[i], strings[j] = strings[j], strings[i]
	}
}