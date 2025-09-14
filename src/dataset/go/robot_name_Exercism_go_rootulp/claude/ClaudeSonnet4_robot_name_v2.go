package robotname

import (
	"errors"
	"math/rand"
	"time"
)

type Robot struct {
	name string
}

const maxNumberOfNames = 26 * 26 * 10 * 10 * 10

var (
	robotNames = make(map[string]bool, maxNumberOfNames)
	rng        = rand.New(rand.NewSource(time.Now().UnixNano()))
)

func (r *Robot) Name() (name string, err error) {
	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}
	if r.name == "" {
		r.name = generateName()
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	if r.name != "" {
		delete(robotNames, r.name)
		r.name = ""
	}
}

func generateName() string {
	for {
		name := generateNamePrefix() + generateNameSuffix()
		if !robotNames[name] {
			robotNames[name] = true
			return name
		}
	}
}

func generateNamePrefix() string {
	first := byte('A' + rng.Intn(26))
	second := byte('A' + rng.Intn(26))
	return string([]byte{first, second})
}

func generateNameSuffix() string {
	num := rng.Intn(1000)
	return string([]byte{
		byte('0' + num/100),
		byte('0' + (num%100)/10),
		byte('0' + num%10),
	})
}