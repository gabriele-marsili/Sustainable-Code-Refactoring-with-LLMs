package robot

// See defs.go for other definitions

// Step 1
// Define Dir type here.
// Define N, E, S, W here.
const (
	N Dir = iota
	E
	S
	W
)

func Right() {
	Step1Robot.Dir = (Step1Robot.Dir + 1) % 4
}

func Left() {
	Step1Robot.Dir = (Step1Robot.Dir + 3) % 4 // Equivalent to subtracting 1 and wrapping around
}

func Advance() {
	switch Step1Robot.Dir {
	case N:
		Step1Robot.Y++
	case E:
		Step1Robot.X++
	case S:
		Step1Robot.Y--
	case W:
		Step1Robot.X--
	}
}

func (d Dir) String() string {
	directions := []string{"North", "East", "South", "West"}
	if d >= N && d <= W {
		return directions[d]
	}
	return ""
}

// Step 2
// Define Action type here.

func StartRobot(command chan Command, action chan Action) {
	// Implementation placeholder
	panic("Please implement the StartRobot function")
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	// Implementation placeholder
	panic("Please implement the Room function")
}

// Step 3
// Define Action3 type here.

func StartRobot3(name, script string, action chan Action3, log chan string) {
	// Implementation placeholder
	panic("Please implement the StartRobot3 function")
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	// Implementation placeholder
	panic("Please implement the Room3 function")
}