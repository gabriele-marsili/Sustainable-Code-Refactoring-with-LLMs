package robotname

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

type Robot string

var (
	namesInUse = make(map[string]struct{})
	mu         sync.Mutex
	rnd        = rand.New(rand.NewSource(time.Now().UnixNano()))
)

func (r *Robot) Name() string {
	mu.Lock()
	defer mu.Unlock()

	if *r != "" {
		return string(*r)
	}

	for {
		name := generateName()
		if _, exists := namesInUse[name]; !exists {
			namesInUse[name] = struct{}{}
			*r = Robot(name)
			return name
		}
	}
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
	return fmt.Sprintf("%c%c%03d", rnd.Intn(26)+'A', rnd.Intn(26)+'A', rnd.Intn(1000))
}