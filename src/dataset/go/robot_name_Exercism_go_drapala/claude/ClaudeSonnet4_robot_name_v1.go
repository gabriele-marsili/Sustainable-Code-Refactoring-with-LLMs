package robotname

import (
	"errors"
	"fmt"
)

// Global variable to track the name of the robot
var GlobalNum []int = []int{0, 0, 0}

// Define the Robot type
type Robot struct {
	name string
}

// Method to return a unique Robot name
func (r *Robot) Name() (string, error) {
	// Return existing name if we already have one
	if r.name != "" {
		return r.name, nil
	}
	
	// Calculate name based on GlobalNum
	robotName := calculateName(GlobalNum)
	
	// Increment GlobalNum
	var err error
	GlobalNum, err = incrementNum(GlobalNum)
	if err != nil {
		return "", err
	}
	
	r.name = robotName
	return robotName, nil
}

// Method to reset name of robot
func (r *Robot) Reset() {
	// Reset name
	r.name = ""
}

// Increment GlobalNum according to our algorithm
func incrementNum(num []int) ([]int, error) {
	num[2]++
	// Increment second char
	if num[2] >= 1000 {
		num[1]++
		num[2] = 0 // Back to 0
	}
	// Increment first char
	if num[1] >= 26 {
		num[0]++
		num[1] = 0 // Back to A
	}
	// Check if we have reached the end
	if num[0] >= 26 {
		return nil, errors.New("index out of range")
	}
	return num, nil
}

// Uses n to deterministically calculate the name of the robot
func calculateName(num []int) string {
	// Pre-allocate string builder with known capacity
	result := make([]byte, 5)
	
	// Calculate name[0] and name[1] directly
	result[0] = byte(65 + num[0])
	result[1] = byte(65 + num[1])
	
	// Calculate name[2:4] more efficiently
	n := num[2]
	result[4] = byte(48 + n%10)
	n /= 10
	result[3] = byte(48 + n%10)
	n /= 10
	result[2] = byte(48 + n%10)
	
	return string(result)
}