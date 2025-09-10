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
	seededRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))
)

func (r *Robot) Name() (string, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.name != "" {
		return r.name, nil
	}

	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}

	name, err := generateName()
	if err != nil {
		return "", err
	}
	r.name = name
	return r.name, nil
}

func (r *Robot) Reset() {
	r.mu.Lock()
	defer r.mu.Unlock()

	newName, err := generateName()
	if err != nil {
		// Handle the error appropriately, possibly by panicking or returning an error.
		// For this example, we'll panic, as Reset should ideally not fail.
		panic(err)
	}
	r.name = newName
}

func generateName() (string, error) {
	nameMutex.Lock()
	defer nameMutex.Unlock()

	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}

	for i := 0; i < maxNumberOfNames; i++ { // Add a limit to prevent infinite loops
		name := generateNamePrefix(2) + generateNameSuffix(3)
		if !robotNames[name] {
			robotNames[name] = true
			return name, nil
		}
	}
	return "", errors.New("failed to generate a unique name after multiple attempts")
}

func generateNamePrefix(n int) string {
	letters := make([]byte, n)
	for i := 0; i < n; i++ {
		letters[i] = byte(seededRand.Intn(26) + 'A')
	}
	return string(letters)
}

func generateNameSuffix(n int) string {
	numbers := make([]byte, n)
	for i := 0; i < n; i++ {
		numbers[i] = byte(seededRand.Intn(10) + '0')
	}
	return string(numbers)
}