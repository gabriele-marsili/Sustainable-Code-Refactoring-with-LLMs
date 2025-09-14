package robotname

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

type Robot string

var (
	namesInUse = make(map[Robot]bool)
	rng        = rand.New(rand.NewSource(time.Now().UnixNano()))
	mu         sync.Mutex
)

func (r *Robot) Name() string {
	mu.Lock()
	defer mu.Unlock()
	
	if string(*r) != "" {
		return string(*r)
	}
	
	for {
		name := Robot(letter() + letter() + number())
		if !namesInUse[name] {
			*r = name
			namesInUse[name] = true
			break
		}
	}
	
	return string(*r)
}

func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()
	
	if string(*r) != "" {
		delete(namesInUse, *r)
		*r = Robot("")
	}
}

func letter() string {
	return string(rng.Intn(26) + 'A')
}

func number() string {
	return fmt.Sprintf("%03d", rng.Intn(1000))
}