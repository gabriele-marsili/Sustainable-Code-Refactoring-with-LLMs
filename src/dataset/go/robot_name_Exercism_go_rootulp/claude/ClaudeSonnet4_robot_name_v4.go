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
	robotNames = make(map[string]struct{}, maxNumberOfNames)
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
		r.name = generateName()
	}
}

func generateName() string {
	nameBytes := make([]byte, 5)
	for {
		nameBytes[0] = byte('A' + rng.Intn(26))
		nameBytes[1] = byte('A' + rng.Intn(26))
		nameBytes[2] = byte('0' + rng.Intn(10))
		nameBytes[3] = byte('0' + rng.Intn(10))
		nameBytes[4] = byte('0' + rng.Intn(10))
		
		name := string(nameBytes)
		if _, exists := robotNames[name]; !exists {
			robotNames[name] = struct{}{}
			return name
		}
	}
}