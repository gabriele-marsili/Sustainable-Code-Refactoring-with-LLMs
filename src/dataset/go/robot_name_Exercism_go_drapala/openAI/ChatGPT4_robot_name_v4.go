package robotname

import (
	"errors"
	"fmt"
	"sync"
)

var (
	globalNum = [3]int{0, 0, 0}
	mu        sync.Mutex
)

type Robot struct {
	name string
}

func (r *Robot) Name() (string, error) {
	if r.name == "" {
		mu.Lock()
		defer mu.Unlock()

		if globalNum[0] >= 26 && globalNum[2] > 0 {
			return "", errors.New("index out of range")
		}

		r.name = fmt.Sprintf("%c%c%03d", 'A'+globalNum[0], 'A'+globalNum[1], globalNum[2])
		incrementNum()
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	r.name = ""
}

func incrementNum() {
	globalNum[2]++
	if globalNum[2] >= 1000 {
		globalNum[2] = 0
		globalNum[1]++
	}
	if globalNum[1] >= 26 {
		globalNum[1] = 0
		globalNum[0]++
	}
}