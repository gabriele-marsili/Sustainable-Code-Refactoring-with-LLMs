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
	for cmd := range command {
		action <- Action(cmd)
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	for act := range action {
		switch act {
		case 'A':
			switch robot.Dir {
			case N:
				if robot.Y+1 <= extent.Max.Y {
					robot.Y++
				}
			case E:
				if robot.X+1 <= extent.Max.X {
					robot.X++
				}
			case S:
				if robot.Y-1 >= extent.Min.Y {
					robot.Y--
				}
			case W:
				if robot.X-1 >= extent.Min.X {
					robot.X--
				}
			}
		case 'R':
			robot.Dir = (robot.Dir + 1) % 4
		case 'L':
			robot.Dir = (robot.Dir + 3) % 4
		}
	}
	report <- robot
	close(report)
}

// Step 3
// Define Action3 type here.

func StartRobot3(name, script string, action chan Action3, log chan string) {
	for _, cmd := range script {
		action <- Action3{name, Command(cmd)}
	}
	close(action)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	robotMap := make(map[string]*Step3Robot)
	for i := range robots {
		robotMap[robots[i].Name] = &robots[i]
	}

	for act := range action {
		robot := robotMap[act.Name]
		switch act.Command {
		case 'A':
			switch robot.Dir {
			case N:
				if robot.Y+1 <= extent.Max.Y {
					robot.Y++
				}
			case E:
				if robot.X+1 <= extent.Max.X {
					robot.X++
				}
			case S:
				if robot.Y-1 >= extent.Min.Y {
					robot.Y--
				}
			case W:
				if robot.X-1 >= extent.Min.X {
					robot.X--
				}
			}
		case 'R':
			robot.Dir = (robot.Dir + 1) % 4
		case 'L':
			robot.Dir = (robot.Dir + 3) % 4
		}
		log <- act.Name + " executed " + string(act.Command)
	}
	rep <- robots
	close(rep)
	close(log)
}