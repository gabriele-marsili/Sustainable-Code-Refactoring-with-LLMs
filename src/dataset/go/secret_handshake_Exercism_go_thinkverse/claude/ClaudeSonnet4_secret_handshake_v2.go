package secret

func Handshake(code uint) []string {
	actions := [4]string{"wink", "double blink", "close your eyes", "jump"}
	var strings []string
	
	for i := 0; i < 4; i++ {
		if code&(1<<i) != 0 {
			strings = append(strings, actions[i])
		}
	}
	
	if code&0b10000 != 0 {
		for i, j := 0, len(strings)-1; i < j; i, j = i+1, j-1 {
			strings[i], strings[j] = strings[j], strings[i]
		}
	}
	
	return strings
}