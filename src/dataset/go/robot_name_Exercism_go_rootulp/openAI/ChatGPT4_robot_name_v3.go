package robotname

import (
	"errors"
	"math/rand"
	"sync"
	"time"
)

type Robot struct {
	name string
}

const maxNumberOfNames = 26 * 26 * 10 * 10 * 10

var (
	robotNames = make(map[string]struct{}, maxNumberOfNames)
	mu         sync.Mutex
	rnd        = rand.New(rand.NewSource(time.Now().UnixNano()))
)

func (r *Robot) Name() (string, error) {
	mu.Lock()
	defer mu.Unlock()

	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}
	if r.name == "" {
		r.name = generateName()
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()

	if r.name != "" {
		delete(robotNames, r.name)
	}
	r.name = generateName()
}

func generateName() string {
	for {
		name := generateNamePrefix() + generateNameSuffix()
		if _, exists := robotNames[name]; !exists {
			robotNames[name] = struct{}{}
			return name
		}
	}
}

func generateNamePrefix() string {
	return string([]byte{
		'A' + byte(rnd.Intn(26)),
		'A' + byte(rnd.Intn(26)),
	})
}

func generateNameSuffix() string {
	return string([]byte{
		'0' + byte(rnd.Intn(10)),
		'0' + byte(rnd.Intn(10)),
		'0' + byte(rnd.Intn(10)),
	})
}