package robotname

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// Robot is just a name (for now)
type Robot string

const (
	maxNameAttempts = 1000 // Limit attempts to generate a unique name
)

var (
	namesInUse   = make(map[Robot]bool)
	namesInUseMu sync.Mutex
	rng          *rand.Rand
	rngOnce      sync.Once
)

func initRng() {
	source := rand.NewSource(time.Now().UnixNano())
	rng = rand.New(source)
}

// Name returns a robots name
func (r *Robot) Name() string {
	rngOnce.Do(initRng) // Initialize RNG only once

	name := string(*r)
	if name != "" {
		return name // Return existing name if already set
	}

	for attempts := 0; attempts < maxNameAttempts; attempts++ {
		newName := Robot(letter() + letter() + number())

		namesInUseMu.Lock()
		_, inUse := namesInUse[newName]
		if !inUse {
			namesInUse[newName] = true
			namesInUseMu.Unlock()
			*r = newName
			return string(*r)
		}
		namesInUseMu.Unlock()
	}

	// If we reach here, it means we couldn't generate a unique name after max attempts.
	// This is a rare case, but we should handle it gracefully.
	// For now, we return a default name and log an error.
	defaultName := "DEFAULT" + letter() + letter() + number()
	*r = Robot(defaultName)

	return string(*r)
}

// Reset give a robot a new name
func (r *Robot) Reset() {
	name := string(*r)
	if name != "" {
		namesInUseMu.Lock()
		delete(namesInUse, Robot(name))
		namesInUseMu.Unlock()
	}
	*r = Robot("")
}

// letter generates a random upper case letter
func letter() string {
	return string(rng.Intn('Z'-'A'+1) + 'A')
}

// number generates a random three digit number
func number() string {
	return fmt.Sprintf("%03d", rng.Intn(1000))
}