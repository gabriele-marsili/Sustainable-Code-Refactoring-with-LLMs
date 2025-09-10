package robot

// See defs.go for other definitions

// Step 1
// Define Dir type here.
// Define N, E, S, W here.

type Dir int

const (
	N Dir = iota
	E
	S
	W
)

var directions = [4]Dir{N, E, S, W}

func Right() {
	mu.Lock()
	defer mu.Unlock()
	Dir = (Dir + 1) % 4
}

func Left() {
	mu.Lock()
	defer mu.Unlock()
	Dir = (Dir + 3) % 4
}

func Advance() {
	mu.Lock()
	defer mu.Unlock()

	nextX, nextY := X, Y

	switch Dir {
	case N:
		nextY++
	case E:
		nextX++
	case S:
		nextY--
	case W:
		nextX--
	}

	if nextX >= Min.X && nextX <= Max.X && nextY >= Min.Y && nextY <= Max.Y {
		X, Y = nextX, nextY
	}
}

func (d Dir) String() string {
	switch d {
	case N:
		return "N"
	case E:
		return "E"
	case S:
		return "S"
	case W:
		return "W"
	default:
		return "Unknown"
	}
}

// Step 2
// Define Action type here.

type Action int

const (
	A Action = iota
	L
	R
)

func StartRobot(command chan Command, action chan Action) {
	for c := range command {
		switch c {
		case 'A':
			action <- A
		case 'L':
			action <- L
		case 'R':
			action <- R
		}
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	Min = extent.Min
	Max = extent.Max
	X = robot.Pos.X
	Y = robot.Pos.Y
	Dir = robot.Dir

	for a := range action {
		switch a {
		case A:
			Advance()
		case L:
			Left()
		case R:
			Right()
		}
	}

	report <- Step2Robot{
		Dir: Dir,
		Pos: Coords{X: X, Y: Y},
	}
	close(report)
}

// Step 3
// Define Action3 type here.

type Action3 int

const (
	ActA Action3 = iota
	ActL
	ActR
)

func StartRobot3(name, script string, action chan Action3, log chan string) {
	for _, c := range script {
		switch c {
		case 'A':
			action <- ActA
		case 'L':
			action <- ActL
		case 'R':
			action <- ActR
		default:
			log <- name + ": invalid command"
		}
	}
	close(action)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	Min = extent.Min
	Max = extent.Max

	numRobots := len(robots)
	robotPositions := make([]Coords, numRobots)
	robotDirections := make([]Dir, numRobots)

	for i := 0; i < numRobots; i++ {
		robotPositions[i] = robots[i].Pos
		robotDirections[i] = robots[i].Dir
	}

	actions := make([]Action3, 0)
	for a := range action {
		actions = append(actions, a)
	}

	actionIndex := 0
	for i := 0; i < numRobots; i++ {
		X = robotPositions[i].X
		Y = robotPositions[i].Y
		Dir = robotDirections[i]

		for actionIndex < len(actions) {
			a := actions[actionIndex]
			switch a {
			case ActA:
				Advance()
			case ActL:
				Left()
			case ActR:
				Right()
			}
			actionIndex++
		}

		robots[i] = Step3Robot{
			Dir: Dir,
			Pos: Coords{X: X, Y: Y},
		}
		actionIndex = 0
	}

	rep <- robots
	close(rep)
}