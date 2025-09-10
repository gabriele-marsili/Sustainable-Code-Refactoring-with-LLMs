package robot

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
	return [...]string{"North", "East", "South", "West"}[d]
}

// Step 2
// Define Action type here.

func StartRobot(command chan Command, action chan Action) {
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	close(report)
}

// Step 3
// Define Action3 type here.

func StartRobot3(name, script string, action chan Action3, log chan string) {
	close(action)
	close(log)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	close(rep)
	close(log)
}