package secret

// steps is an ordered list of action in the secret handshake.
var steps = []string{"wink", "double blink", "close your eyes", "jump"}

/*Handshake preforms a secret handshake from Mary Poppins based on a code.
the steps are
00001 =  1 = wink
00010 =  2 = double blink
00100 =  4 = close your eyes
01000 =  8 = jump
10000 = 16 =  reverse the order of the steps*/
func Handshake(code int) []string {
	if code <= 0 {
		return []string{}
	}

	handshake := make([]string, 0, 4)
	for i := 0; i < len(steps); i++ {
		if code&(1<<uint(i)) != 0 {
			handshake = append(handshake, steps[i])
		}
	}

	if code&(1<<uint(len(steps))) != 0 {
		for i, j := 0, len(handshake)-1; i < j; i, j = i+1, j-1 {
			handshake[i], handshake[j] = handshake[j], handshake[i]
		}
	}
	return handshake
}