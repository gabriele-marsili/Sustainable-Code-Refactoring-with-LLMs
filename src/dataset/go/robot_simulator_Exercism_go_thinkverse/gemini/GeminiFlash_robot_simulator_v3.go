package robot

// See defs.go for other definitions

// Step 1
// Define Dir type here.
// Define N, E, S, W here.
type Dir int

const (
	N Dir = 0
	E Dir = 1
	S Dir = 2
	W Dir = 3
)

func Right() {
	Step1Robot.Dir = (Step1Robot.Dir + 1) % 4
}

func Left() {
	Step1Robot.Dir = (Step1Robot.Dir + 3) % 4
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
	switch d {
	case N:
		return "North"
	case E:
		return "East"
	case S:
		return "South"
	case W:
		return "West"
	default:
		return ""
	}
}

// Step 2
// Define Action type here.
type Action int

func StartRobot(command chan Command, action chan Action) {
	panic("Please implement the StartRobot function")
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	panic("Please implement the Room function")
}

// Step 3
// Define Action3 type here.
type Action3 int

func StartRobot3(name, script string, action chan Action3, log chan string) {
	panic("Please implement the StartRobot3 function")
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	panic("Please implement the Room3 function")
}