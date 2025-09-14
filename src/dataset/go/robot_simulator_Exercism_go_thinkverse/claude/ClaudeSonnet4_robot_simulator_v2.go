package robot

// See defs.go for other definitions

// Step 1
// Define Dir type here.
// Define N, E, S, W here.
const (
	N Dir = 0
	E Dir = 1
	S Dir = 2
	W Dir = 3
)

func Right() {
	Step1Robot.Dir = (Step1Robot.Dir + 1) & 3
}

func Left() {
	Step1Robot.Dir = (Step1Robot.Dir + 3) & 3
}

var dirDeltas = [4][2]int{
	{0, 1},  // N
	{1, 0},  // E
	{0, -1}, // S
	{-1, 0}, // W
}

func Advance() {
	delta := dirDeltas[Step1Robot.Dir]
	Step1Robot.X += delta[0]
	Step1Robot.Y += delta[1]
}

var dirStrings = [4]string{"North", "East", "South", "West"}

func (d Dir) String() string {
	if d >= 0 && d <= 3 {
		return dirStrings[d]
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