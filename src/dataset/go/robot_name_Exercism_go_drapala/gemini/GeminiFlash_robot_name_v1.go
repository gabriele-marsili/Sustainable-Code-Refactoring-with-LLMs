package robotname

import (
	"errors"
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// Define the Robot type
type Robot struct {
	name string
}

var (
	names     = make(map[string]bool)
	namesLock sync.Mutex
	rng       = rand.New(rand.NewSource(time.Now().UnixNano()))
)

// Method to return a unique Robot name
func (r *Robot) Name() (string, error) {
	if r.name != "" {
		return r.name, nil
	}

	name, err := generateName()
	if err != nil {
		return "", err
	}

	r.name = name
	return r.name, nil
}

// Method to reset name of robot
func (r *Robot) Reset() {
	r.name = ""
}

func generateName() (string, error) {
	namesLock.Lock()
	defer namesLock.Unlock()

	if len(names) >= 26*26*1000 {
		return "", errors.New("all possible names have been used")
	}

	for {
		name := fmt.Sprintf("%c%c%03d", randChar(), randChar(), randInt())
		if !names[name] {
			names[name] = true
			return name, nil
		}
	}
}

func randChar() rune {
	return rune(rng.Intn(26) + 'A')
}

func randInt() int {
	return rng.Intn(1000)
}