package secret

var operations = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code uint) []string {
	handshake := make([]string, 0, 4)
	for i := 0; i < len(operations); i++ {
		if code&(1<<i) != 0 {
			handshake = append(handshake, operations[i])
		}
	}
	if code&(1<<4) != 0 {
		for i, j := 0, len(handshake)-1; i < j; i, j = i+1, j-1 {
			handshake[i], handshake[j] = handshake[j], handshake[i]
		}
	}
	return handshake
}