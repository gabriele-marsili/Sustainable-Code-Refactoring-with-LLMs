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
	rng        = rand.New(rand.NewSource(time.Now().UnixNano()))
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
		'A' + byte(rng.Intn(26)),
		'A' + byte(rng.Intn(26)),
	})
}

func generateNameSuffix() string {
	return string([]byte{
		'0' + byte(rng.Intn(10)),
		'0' + byte(rng.Intn(10)),
		'0' + byte(rng.Intn(10)),
	})
}