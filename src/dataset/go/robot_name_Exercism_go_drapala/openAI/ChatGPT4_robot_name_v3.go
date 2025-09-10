package robotname

import (
	"errors"
	"fmt"
	"sync"
)

var (
	globalNum = []int{0, 0, 0}
	mu        sync.Mutex
)

type Robot struct {
	name string
}

func (r *Robot) Name() (string, error) {
	if r.name == "" {
		mu.Lock()
		defer mu.Unlock()

		if r.name == "" {
			robotName := calculateName(globalNum)
			if err := incrementNum(globalNum); err != nil {
				return "", err
			}
			r.name = robotName
		}
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	r.name = ""
}

func incrementNum(num []int) error {
	num[2]++
	if num[2] >= 1000 {
		num[1]++
		num[2] = 0
	}
	if num[1] >= 26 {
		num[0]++
		num[1] = 0
	}
	if num[0] >= 26 && num[2] > 0 {
		return errors.New("index out of range")
	}
	return nil
}

func calculateName(num []int) string {
	return fmt.Sprintf("%c%c%03d", 'A'+num[0], 'A'+num[1], num[2])
}