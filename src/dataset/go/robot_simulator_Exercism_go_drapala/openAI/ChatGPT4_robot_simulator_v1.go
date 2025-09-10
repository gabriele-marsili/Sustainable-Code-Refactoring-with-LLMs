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

func (d Dir) String() string {
	return [...]string{"N", "E", "S", "W"}[d]
}

// Step 2
type Action struct {
	Command Command
}

func StartRobot(command chan Command, action chan Action) {
	go func() {
		for cmd := range command {
			action <- Action{Command: cmd}
		}
		close(action)
	}()
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	go func() {
		for act := range action {
			switch act.Command {
			case 'R':
				Right(&robot.Dir)
			case 'L':
				Left(&robot.Dir)
			case 'A':
				newPos := robot.Pos
				Advance(&newPos, robot.Dir)
				if newPos.Easting >= extent.Min.Easting && newPos.Easting <= extent.Max.Easting &&
					newPos.Northing >= extent.Min.Northing && newPos.Northing <= extent.Max.Northing {
					robot.Pos = newPos
				}
			}
		}
		report <- robot
	}()
}

// Step 3
type Action3 struct {
	Name    string
	Command Command
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	go func() {
		for _, cmd := range script {
			action <- Action3{Name: name, Command: Command(cmd)}
		}
		close(log)
	}()
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	go func() {
		robotMap := make(map[string]*Step3Robot)
		for i := range robots {
			robotMap[robots[i].Name] = &robots[i]
		}

		for act := range action {
			robot := robotMap[act.Name]
			switch act.Command {
			case 'R':
				Right(&robot.Dir)
			case 'L':
				Left(&robot.Dir)
			case 'A':
				newPos := robot.Pos
				Advance(&newPos, robot.Dir)
				if newPos.Easting >= extent.Min.Easting && newPos.Easting <= extent.Max.Easting &&
					newPos.Northing >= extent.Min.Northing && newPos.Northing <= extent.Max.Northing {
					robot.Pos = newPos
				}
			}
			log <- act.Name + " executed " + string(act.Command)
		}
		rep <- robots
		close(log)
	}()
}