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
	namesMutex sync.RWMutex
	rng        = rand.New(rand.NewSource(time.Now().UnixNano()))
	rngMutex   sync.Mutex
)

func (r *Robot) Name() (name string, err error) {
	namesMutex.RLock()
	if len(robotNames) == maxNumberOfNames {
		namesMutex.RUnlock()
		return "", errors.New("namespace exhausted")
	}
	namesMutex.RUnlock()

	if r.name == "" {
		r.name = generateName()
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	if r.name != "" {
		namesMutex.Lock()
		delete(robotNames, r.name)
		namesMutex.Unlock()
	}
	r.name = generateName()
}

func generateName() string {
	namesMutex.Lock()
	defer namesMutex.Unlock()

	for {
		name := generateNamePrefix(2) + generateNameSuffix(3)
		if _, exists := robotNames[name]; !exists {
			robotNames[name] = struct{}{}
			return name
		}
	}
}

func generateNamePrefix(length int) string {
	rngMutex.Lock()
	defer rngMutex.Unlock()
	
	result := make([]byte, length)
	for i := 0; i < length; i++ {
		result[i] = byte('A' + rng.Intn(26))
	}
	return string(result)
}

func generateNameSuffix(length int) string {
	rngMutex.Lock()
	defer rngMutex.Unlock()
	
	result := make([]byte, length)
	for i := 0; i < length; i++ {
		result[i] = byte('0' + rng.Intn(10))
	}
	return string(result)
}