package robotname

import (
	"errors"
	"strconv"
)

var GlobalNum [3]int

type Robot struct {
	name string
}

func (r *Robot) Name() (string, error) {
	if r.name == "" {
		robotName := calculateName(GlobalNum)
		if err := incrementNum(); err != nil {
			return "", err
		}
		r.name = robotName
		return robotName, nil
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	r.name = ""
}

func incrementNum() error {
	GlobalNum[2]++
	if GlobalNum[2] >= 1000 {
		GlobalNum[1]++
		GlobalNum[2] = 0
	}
	if GlobalNum[1] >= 26 {
		GlobalNum[0]++
		GlobalNum[1] = 0
	}
	if GlobalNum[0] >= 26 && GlobalNum[2] > 0 {
		return errors.New("index out of range")
	}
	return nil
}

func calculateName(num [3]int) string {
	result := make([]byte, 5)
	result[0] = byte(65 + num[0])
	result[1] = byte(65 + num[1])
	
	numStr := strconv.Itoa(num[2])
	switch len(numStr) {
	case 1:
		result[2] = '0'
		result[3] = '0'
		result[4] = numStr[0]
	case 2:
		result[2] = '0'
		result[3] = numStr[0]
		result[4] = numStr[1]
	case 3:
		result[2] = numStr[0]
		result[3] = numStr[1]
		result[4] = numStr[2]
	}
	
	return string(result)
}