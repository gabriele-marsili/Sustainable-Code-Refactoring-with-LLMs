package robotname

import (
	"fmt"
	"math/rand"
	"sync"
)

const (
	letters    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	nameFormat = "%s%s%03d"
)

var (
	namesInUse = make(map[string]struct{})
	mu         sync.Mutex
	rng        = rand.New(rand.NewSource(1)) // Use a single seeded RNG for efficiency
)

// Robot represents a robot with a unique name
type Robot struct {
	name string
}

// Name returns a robot's name
func (r *Robot) Name() string {
	mu.Lock()
	defer mu.Unlock()

	if r.name == "" {
		for {
			newName := generateName()
			if _, exists := namesInUse[newName]; !exists {
				namesInUse[newName] = struct{}{}
				r.name = newName
				break
			}
		}
	}
	return r.name
}

// Reset gives a robot a new name
func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()

	if r.name != "" {
		delete(namesInUse, r.name)
		r.name = ""
	}
}

// generateName creates a random robot name
func generateName() string {
	return fmt.Sprintf(nameFormat, string(letters[rng.Intn(26)]), string(letters[rng.Intn(26)]), rng.Intn(1000))
}