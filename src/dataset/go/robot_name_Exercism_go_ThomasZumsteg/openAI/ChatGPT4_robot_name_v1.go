package robotname

import (
	"fmt"
	"math/rand"
	"sync"
)

// Robot is just a name (for now)
type Robot string

// namesInUse keeps track of which names are in use
var (
	namesInUse = make(map[Robot]struct{})
	mu         sync.Mutex
	rng        = rand.New(rand.NewSource(1)) // Use a single RNG instance for efficiency
)

/*Name returns a robot's name*/
func (r *Robot) Name() string {
	if *r != "" {
		return string(*r)
	}

	mu.Lock()
	defer mu.Unlock()

	for {
		name := Robot(generateName())
		if _, exists := namesInUse[name]; !exists {
			namesInUse[name] = struct{}{}
			*r = name
			break
		}
	}

	return string(*r)
}

/*Reset gives a robot a new name*/
func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()

	if *r != "" {
		delete(namesInUse, *r)
	}
	*r = Robot("")
}

/*generateName creates a random robot name*/
func generateName() string {
	return fmt.Sprintf("%c%c%03d", rng.Intn(26)+'A', rng.Intn(26)+'A', rng.Intn(1000))
}