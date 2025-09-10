package robotname

import (
	"errors"
	"math/rand"
	"sync"
	"time"
)

type Robot struct {
	name string
	mu   sync.Mutex
}

const maxNumberOfNames = 26 * 26 * 10 * 10 * 10

var (
	robotNames = make(map[string]bool)
	nameMutex  sync.Mutex
	rng        *rand.Rand
	initialized bool
)

func init() {
	seed := time.Now().UnixNano()
	rng = rand.New(rand.NewSource(seed))
	initialized = true
}

func (r *Robot) Name() (string, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}

	if r.name == "" {
		var err error
		r.name, err = generateName()
		if err != nil {
			return "", err
		}
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	r.mu.Lock()
	defer r.mu.Unlock()

	newName, err := generateName()
	if err == nil {
		r.name = newName
	}
}

func generateName() (string, error) {
	nameMutex.Lock()
	defer nameMutex.Unlock()

	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}

	for {
		name := generateNamePrefix(2) + generateNameSuffix(3)
		if !robotNames[name] {
			robotNames[name] = true
			return name, nil
		}
		if len(robotNames) == maxNumberOfNames {
			return "", errors.New("namespace exhausted")
		}
	}
}

func generateNamePrefix(length int) string {
	letters := make([]byte, length)
	for i := 0; i < length; i++ {
		letters[i] = byte(rng.Intn(26) + 'A')
	}
	return string(letters)
}

func generateNameSuffix(length int) string {
	numbers := make([]byte, length)
	for i := 0; i < length; i++ {
		numbers[i] = byte(rng.Intn(10) + '0')
	}
	return string(numbers)
}