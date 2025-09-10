package robot

type Dir int

const (
	N Dir = iota
	E
	S
	W
)

func (d Dir) String() string {
	return [...]string{"N", "E", "S", "W"}[d]
}

func Right(d *Dir) {
	*d = (*d + 1) % 4
}

func Left(d *Dir) {
	*d = (*d + 3) % 4
}

func Advance(pos *Pos, dir Dir) {
	switch dir {
	case N:
		pos.Northing++
	case E:
		pos.Easting++
	case S:
		pos.Northing--
	case W:
		pos.Easting--
	}
}

type Action int

const (
	RightAction Action = iota
	LeftAction
	AdvanceAction
)

func StartRobot(command chan Command, action chan Action) {
	for cmd := range command {
		switch cmd {
		case 'R':
			action <- RightAction
		case 'L':
			action <- LeftAction
		case 'A':
			action <- AdvanceAction
		}
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	for act := range action {
		switch act {
		case RightAction:
			Right(&robot.Dir)
		case LeftAction:
			Left(&robot.Dir)
		case AdvanceAction:
			newPos := robot.Pos
			Advance(&newPos, robot.Dir)
			if newPos.Easting >= extent.Min.Easting && newPos.Easting <= extent.Max.Easting &&
				newPos.Northing >= extent.Min.Northing && newPos.Northing <= extent.Max.Northing {
				robot.Pos = newPos
			}
		}
	}
	report <- robot
}

type Action3 struct {
	Name   string
	Action Action
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	for _, cmd := range script {
		var act Action
		switch cmd {
		case 'R':
			act = RightAction
		case 'L':
			act = LeftAction
		case 'A':
			act = AdvanceAction
		default:
			continue
		}
		action <- Action3{Name: name, Action: act}
	}
	log <- name + " finished"
	close(log)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	robotMap := make(map[string]*Step3Robot)
	for i := range robots {
		robotMap[robots[i].Name] = &robots[i]
	}

	for act := range action {
		robot := robotMap[act.Name]
		switch act.Action {
		case RightAction:
			Right(&robot.Dir)
		case LeftAction:
			Left(&robot.Dir)
		case AdvanceAction:
			newPos := robot.Pos
			Advance(&newPos, robot.Dir)
			if newPos.Easting >= extent.Min.Easting && newPos.Easting <= extent.Max.Easting &&
				newPos.Northing >= extent.Min.Northing && newPos.Northing <= extent.Max.Northing {
				robot.Pos = newPos
			}
		}
	}
	rep <- robots
	close(log)
}