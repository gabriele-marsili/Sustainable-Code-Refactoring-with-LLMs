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
	names   = make(map[string]bool)
	namesMu sync.Mutex
	rng     = rand.New(rand.NewSource(time.Now().UnixNano()))
)

// Method to return a unique Robot name
func (r *Robot) Name() (string, error) {
	if r.name != "" {
		return r.name, nil
	}

	name, err := generateUniqueName()
	if err != nil {
		return "", err
	}

	r.name = name
	return name, nil
}

// Method to reset name of robot
func (r *Robot) Reset() {
	r.name = ""
}

func generateUniqueName() (string, error) {
	namesMu.Lock()
	defer namesMu.Unlock()

	if len(names) >= 26*26*1000 {
		return "", errors.New("all possible names have been used")
	}

	for {
		name := generateName()
		if !names[name] {
			names[name] = true
			return name, nil
		}
	}
}

func generateName() string {
	letter1 := rune(rng.Intn(26) + 'A')
	letter2 := rune(rng.Intn(26) + 'A')
	number := rng.Intn(1000)
	return fmt.Sprintf("%c%c%03d", letter1, letter2, number)
}