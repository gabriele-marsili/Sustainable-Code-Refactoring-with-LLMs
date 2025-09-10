package robot

// Step 1
type Dir int

const (
	N Dir = iota
	E
	S
	W
)

func Right(d *Dir) {
	*d = (*d + 1) % 4
}

func Left(d *Dir) {
	*d = (*d + 3) % 4
}

func Advance(pos *Point, dir Dir) {
	switch dir {
	case N:
		pos.Y++
	case E:
		pos.X++
	case S:
		pos.Y--
	case W:
		pos.X--
	}
}

func (d Dir) String() string {
	return [...]string{"N", "E", "S", "W"}[d]
}

// Step 2
type Action int

const (
	MoveForward Action = iota
	TurnLeft
	TurnRight
)

func StartRobot(command chan Command, action chan Action) {
	for cmd := range command {
		switch cmd {
		case 'A':
			action <- MoveForward
		case 'L':
			action <- TurnLeft
		case 'R':
			action <- TurnRight
		}
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	for act := range action {
		switch act {
		case MoveForward:
			newPos := robot.Pos
			Advance(&newPos, robot.Dir)
			if newPos.X >= extent.Min.X && newPos.X <= extent.Max.X &&
				newPos.Y >= extent.Min.Y && newPos.Y <= extent.Max.Y {
				robot.Pos = newPos
			}
		case TurnLeft:
			Left(&robot.Dir)
		case TurnRight:
			Right(&robot.Dir)
		}
	}
	report <- robot
}

// Step 3
type Action3 struct {
	RobotName string
	Action    Action
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	for _, cmd := range script {
		var act Action
		switch cmd {
		case 'A':
			act = MoveForward
		case 'L':
			act = TurnLeft
		case 'R':
			act = TurnRight
		}
		action <- Action3{RobotName: name, Action: act}
		log <- name + ": Executed " + string(cmd)
	}
	close(action)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	robotMap := make(map[string]*Step3Robot)
	for i := range robots {
		robotMap[robots[i].Name] = &robots[i]
	}

	for act := range action {
		robot := robotMap[act.RobotName]
		switch act.Action {
		case MoveForward:
			newPos := robot.Pos
			Advance(&newPos, robot.Dir)
			if newPos.X >= extent.Min.X && newPos.X <= extent.Max.X &&
				newPos.Y >= extent.Min.Y && newPos.Y <= extent.Max.Y {
				robot.Pos = newPos
			}
		case TurnLeft:
			Left(&robot.Dir)
		case TurnRight:
			Right(&robot.Dir)
		}
		log <- act.RobotName + ": Performed action"
	}
	rep <- robots
}