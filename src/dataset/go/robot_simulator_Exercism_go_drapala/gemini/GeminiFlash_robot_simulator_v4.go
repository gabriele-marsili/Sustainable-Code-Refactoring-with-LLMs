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

var directions = []Dir{N, E, S, W}

func (r *Robot) Right() {
	r.Dir = directions[(int(r.Dir)+1)%4]
}

func (r *Robot) Left() {
	r.Dir = directions[(int(r.Dir)+3)%4]
}

func (r *Robot) Advance() {
	switch r.Dir {
	case N:
		r.Y++
	case E:
		r.X++
	case S:
		r.Y--
	case W:
		r.X--
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
		return "Invalid Direction"
	}
}

// Step 2
// Define Action type here.

type Action func(*Robot)

func StartRobot(command chan Command, action chan Action) {
	robot := &Robot{Dir: N, X: 0, Y: 0}
	for cmd := range command {
		switch cmd {
		case 'R':
			action <- robot.Right
		case 'L':
			action <- robot.Left
		case 'A':
			action <- robot.Advance
		}
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	r := &Robot{Dir: N, X: 0, Y: 0}
	for act := range action {
		act(r)
		if r.X < extent.Min.X {
			r.X = extent.Min.X
		}
		if r.X > extent.Max.X {
			r.X = extent.Max.X
		}
		if r.Y < extent.Min.Y {
			r.Y = extent.Min.Y
		}
		if r.Y > extent.Max.Y {
			r.Y = extent.Max.Y
		}
	}
	report <- Step2Robot{X: r.X, Y: r.Y, Dir: r.Dir}
	close(report)
}

// Step 3
// Define Action3 type here.

type Action3 func(*Step3Robot, Rect)

func StartRobot3(name, script string, action chan Action3, log chan string) {
	robot := &Step3Robot{Name: name, X: 0, Y: 0, Dir: N}
	for _, cmd := range script {
		switch cmd {
		case 'R':
			action <- func(r *Step3Robot, rect Rect) {
				r.Dir = directions[(int(r.Dir)+1)%4]
			}
		case 'L':
			action <- func(r *Step3Robot, rect Rect) {
				r.Dir = directions[(int(r.Dir)+3)%4]
			}
		case 'A':
			action <- func(r *Step3Robot, rect Rect) {
				switch r.Dir {
				case N:
					r.Y++
				case E:
					r.X++
				case S:
					r.Y--
				case W:
					r.X--
				}
			}
		default:
			log <- name + ": Illegal instruction"
		}
	}
	close(action)
	close(log)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	for act := range action {
		for i := range robots {
			act(&robots[i], extent)
			if robots[i].X < extent.Min.X {
				robots[i].X = extent.Min.X
			}
			if robots[i].X > extent.Max.X {
				robots[i].X = extent.Max.X
			}
			if robots[i].Y < extent.Min.Y {
				robots[i].Y = extent.Min.Y
			}
			if robots[i].Y > extent.Max.Y {
				robots[i].Y = extent.Max.Y
			}
		}
	}
	rep <- robots
	close(rep)
}