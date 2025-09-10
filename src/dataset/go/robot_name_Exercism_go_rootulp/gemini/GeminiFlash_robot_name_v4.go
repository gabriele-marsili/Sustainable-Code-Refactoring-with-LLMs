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

func (r *Robot) Name() (name string, err error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}

	if r.name == "" {
		newName, err := generateName()
		if err != nil {
			return "", err
		}
		r.name = newName
	}
	return r.name, nil
}

func (r *Robot) Reset() {
	r.mu.Lock()
	defer r.mu.Unlock()

	newName, err := generateName()
	if err != nil {
		panic(err) // Or handle the error more gracefully, depending on requirements
	}
	r.name = newName
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

func generateNamePrefix(size int) string {
	letters := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, size)
	for i := range b {
		b[i] = letters[rng.Intn(len(letters))]
	}
	return string(b)
}

func generateNameSuffix(size int) string {
	numbers := []rune("0123456789")
	b := make([]rune, size)
	for i := range b {
		b[i] = numbers[rng.Intn(len(numbers))]
	}
	return string(b)
}