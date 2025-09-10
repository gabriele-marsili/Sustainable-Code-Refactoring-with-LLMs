package robotname

import (
	"errors"
	"fmt"
	"sync"
)

var (
	globalNum = []int{0, 0, 0}
	mu        sync.Mutex // Mutex to ensure thread safety
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

		r.name = calculateName(globalNum)
		incrementNum(globalNum)
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	r.name = ""
}

func incrementNum(num []int) {
	num[2]++
	if num[2] >= 1000 {
		num[1]++
		num[2] = 0
	}
	if num[1] >= 26 {
		num[0]++
		num[1] = 0
	}
}

func calculateName(num []int) string {
	return fmt.Sprintf("%c%c%03d", 'A'+num[0], 'A'+num[1], num[2])
}