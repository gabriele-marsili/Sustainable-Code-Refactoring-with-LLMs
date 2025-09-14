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
	Step1Robot.Dir = (Step1Robot.Dir + 1) & 3
}

func Left() {
	Step1Robot.Dir = (Step1Robot.Dir + 3) & 3
}

var dirDeltas = [4][2]int{
	N: {0, 1},
	E: {1, 0},
	S: {0, -1},
	W: {-1, 0},
}

func Advance() {
	delta := dirDeltas[Step1Robot.Dir]
	Step1Robot.X += delta[0]
	Step1Robot.Y += delta[1]
}

var dirNames = [4]string{
	N: "North",
	E: "East",
	S: "South",
	W: "West",
}

func (d Dir) String() string {
	if d >= 0 && d < 4 {
		return dirNames[d]
	}
	return ""
}

// Step 2
// Define Action type here.

func StartRobot(command chan Command, action chan Action) {
	panic("Please implement the StartRobot function")
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	panic("Please implement the Room function")
}

// Step 3
// Define Action3 type here.

func StartRobot3(name, script string, action chan Action3, log chan string) {
	panic("Please implement the StartRobot3 function")
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	panic("Please implement the Room3 function")
}