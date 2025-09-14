package robotname

import (
	"errors"
	"fmt"
)

// Global variable to track the name of the robot
var GlobalNum [3]int

// Define the Robot type
type Robot struct {
	name string
}

// Method to return a unique Robot name
func (r *Robot) Name() (string, error) {
    // Return new name if we don't have one yet
	if r.name == "" {
        // Calculate name based on GlobalNum
        robotName := calculateName(GlobalNum)
		// Increment GlobalNum
		err := incrementNum()
		// Check if out of range
		if err == nil {
			r.name = robotName
			return robotName, nil
		} else {
			return "", err
		}
    } else {
        // If name already exists, return existing name
        return r.name, nil
    }
}

// Method to reset name of robot
func (r *Robot) Reset() {
	// Reset name
	r.name = ""
}

// Increment GlobalNum according to our algorithm
func incrementNum() error {
    GlobalNum[2]++
    // Increment second char
    if GlobalNum[2] >= 1000 {
        GlobalNum[1]++
        GlobalNum[2] = 0 // Back to 0
    }
    // Increment first char
    if GlobalNum[1] >= 26 {
        GlobalNum[0]++
        GlobalNum[1] = 0 // Back to A
    }
    // Check if we have reached the end
    if GlobalNum[0] >= 26 && GlobalNum[2] > 0 {
        return errors.New("index out of range")
    }
    return nil
}

// Uses n to deterministically calculate the name of the robot
func calculateName(num [3]int) string {
    // Pre-allocate string builder with known capacity
    result := make([]byte, 5)
    result[0] = byte(65 + num[0])
    result[1] = byte(65 + num[1])
    
    // Convert number to string manually to avoid fmt.Sprintf overhead
    n := num[2]
    result[4] = byte(48 + n%10)
    n /= 10
    result[3] = byte(48 + n%10)
    n /= 10
    result[2] = byte(48 + n%10)
    
    return string(result)
}