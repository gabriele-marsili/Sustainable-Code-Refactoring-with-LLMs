package robotname

import (
	"fmt"
	"math/rand"
	"sync"
)

type Robot string

var (
	namesInUse = make(map[string]struct{})
	mu         sync.Mutex
	rng        = rand.New(rand.NewSource(1)) // Use a single RNG instance
)

func (r *Robot) Name() string {
	mu.Lock()
	defer mu.Unlock()

	if *r == "" {
		for {
			name := generateName()
			if _, exists := namesInUse[name]; !exists {
				namesInUse[name] = struct{}{}
				*r = Robot(name)
				break
			}
		}
	}
	return string(*r)
}

func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()

	if *r != "" {
		delete(namesInUse, string(*r))
	}
	*r = Robot("")
}

func generateName() string {
	return fmt.Sprintf("%c%c%03d", rng.Intn(26)+'A', rng.Intn(26)+'A', rng.Intn(1000))
}