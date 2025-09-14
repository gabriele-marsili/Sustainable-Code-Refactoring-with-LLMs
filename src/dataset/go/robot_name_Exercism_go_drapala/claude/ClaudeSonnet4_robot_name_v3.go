package robotname

import (
	"errors"
	"fmt"
	"sync"
)

var (
	globalCounter int
	counterMutex  sync.Mutex
)

type Robot struct {
	name string
}

func (r *Robot) Name() (string, error) {
	if r.name == "" {
		counterMutex.Lock()
		defer counterMutex.Unlock()
		
		if globalCounter >= 676000 {
			return "", errors.New("index out of range")
		}
		
		r.name = calculateNameFromCounter(globalCounter)
		globalCounter++
		return r.name, nil
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	r.name = ""
}

func incrementNum(num []int) ([]int, error) {
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
		return nil, errors.New("index out of range")
	}
	return num, nil
}

func calculateName(num []int) string {
	return fmt.Sprintf("%c%c%03d", 
		rune(65+num[0]), 
		rune(65+num[1]), 
		num[2])
}

func calculateNameFromCounter(counter int) string {
	first := counter / 26000
	remainder := counter % 26000
	second := remainder / 1000
	third := remainder % 1000
	
	return fmt.Sprintf("%c%c%03d", 
		rune(65+first), 
		rune(65+second), 
		third)
}