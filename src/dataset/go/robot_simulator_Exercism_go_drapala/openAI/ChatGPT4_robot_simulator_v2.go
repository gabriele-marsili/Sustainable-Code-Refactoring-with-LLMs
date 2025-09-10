package robot

// Step 1
// Define Dir type here.
type Dir int

// Define N, E, S, W here.
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
// Define Action type here.
type Action func(*Step2Robot)

func StartRobot(command chan Command, action chan Action) {
	go func() {
		for cmd := range command {
			switch cmd {
			case 'R':
				action <- func(r *Step2Robot) { Right(&r.Dir) }
			case 'L':
				action <- func(r *Step2Robot) { Left(&r.Dir) }
			case 'A':
				action <- func(r *Step2Robot) { Advance(&r.Pos, r.Dir) }
			}
		}
		close(action)
	}()
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	go func() {
		for act := range action {
			act(&robot)
			if robot.Pos.Northing < extent.Min.Northing || robot.Pos.Northing > extent.Max.Northing ||
				robot.Pos.Easting < extent.Min.Easting || robot.Pos.Easting > extent.Max.Easting {
				// Revert action if out of bounds
				switch robot.Dir {
				case N:
					robot.Pos.Northing--
				case E:
					robot.Pos.Easting--
				case S:
					robot.Pos.Northing++
				case W:
					robot.Pos.Easting++
				}
			}
		}
		report <- robot
	}()
}

// Step 3
// Define Action3 type here.
type Action3 struct {
	Name   string
	Action Action
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	go func() {
		for _, cmd := range script {
			var act Action
			switch cmd {
			case 'R':
				act = func(r *Step3Robot) { Right(&r.Dir) }
			case 'L':
				act = func(r *Step3Robot) { Left(&r.Dir) }
			case 'A':
				act = func(r *Step3Robot) { Advance(&r.Pos, r.Dir) }
			}
			action <- Action3{Name: name, Action: act}
		}
		log <- name + " finished"
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
			act.Action(robot)
			if robot.Pos.Northing < extent.Min.Northing || robot.Pos.Northing > extent.Max.Northing ||
				robot.Pos.Easting < extent.Min.Easting || robot.Pos.Easting > extent.Max.Easting {
				// Revert action if out of bounds
				switch robot.Dir {
				case N:
					robot.Pos.Northing--
				case E:
					robot.Pos.Easting--
				case S:
					robot.Pos.Northing++
				case W:
					robot.Pos.Easting++
				}
			}
		}
		rep <- robots
	}()
}