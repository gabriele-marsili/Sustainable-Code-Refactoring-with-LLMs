package robotname

import (
	"errors"
	"fmt"
	"sync"
)

// Constants for name generation
const (
	maxNames = 26 * 26 * 1000
	letterA  = 'A'
)

// Global state
var (
	nameCounter int
	usedNames   = make(map[string]bool)
	mu          sync.Mutex
)

// Robot type
type Robot struct {
	name string
}

// Name returns the robot's name, generating a new one if needed.
func (r *Robot) Name() (string, error) {
	mu.Lock()
	defer mu.Unlock()

	if r.name != "" {
		return r.name, nil
	}

	if nameCounter >= maxNames {
		return "", errors.New("all robot names have been used")
	}

	var name string
	for {
		name = generateName(nameCounter)
		if !usedNames[name] {
			break
		}
		nameCounter++
		if nameCounter >= maxNames {
			return "", errors.New("all robot names have been used")
		}
	}

	usedNames[name] = true
	r.name = name
	nameCounter++
	return name, nil
}

// Reset resets the robot's name, allowing it to be reused.
func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()

	if r.name != "" {
		delete(usedNames, r.name)
		r.name = ""
	}
}

// generateName creates a robot name from an integer.
func generateName(n int) string {
	letterIndex1 := n / 1000 / 26
	letterIndex2 := (n / 1000) % 26
	number := n % 1000

	return fmt.Sprintf("%c%c%03d", letterA+rune(letterIndex1), letterA+rune(letterIndex2), number)
}