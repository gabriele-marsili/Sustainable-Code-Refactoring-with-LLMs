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

func (r *Robot) Right() {
	r.Dir = (r.Dir + 1) % 4
}

func (r *Robot) Left() {
	r.Dir = (r.Dir + 3) % 4
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
		return "Unknown"
	}
}

// Step 2
// Define Action type here.

type Action func(r *Robot)

func StartRobot(command chan Command, action chan Action) {
	r := &Robot{Dir: N, X: 0, Y: 0}
	for cmd := range command {
		switch cmd {
		case 'R':
			action <- r.Right
		case 'L':
			action <- r.Left
		case 'A':
			action <- r.Advance
		}
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	r := robot
	for act := range action {
		act(&r)
		if r.X < extent.Min.X || r.X > extent.Max.X || r.Y < extent.Min.Y || r.Y > extent.Max.Y {
			r = robot
		}
	}
	report <- r
	close(report)
}

// Step 3
// Define Action3 type here.

type Action3 func(r *Step3Robot)

func StartRobot3(name, script string, action chan Action3, log chan string) {
	r := &Step3Robot{Name: name, X: 0, Y: 0, Dir: N}
	for _, cmd := range script {
		switch cmd {
		case 'R':
			action <- func(r *Step3Robot) {
				r.Dir = (r.Dir + 1) % 4
				log <- r.Name + " turned right"
			}
		case 'L':
			action <- func(r *Step3Robot) {
				r.Dir = (r.Dir + 3) % 4
				log <- r.Name + " turned left"
			}
		case 'A':
			action <- func(r *Step3Robot) {
				originalX := r.X
				originalY := r.Y
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
				log <- r.Name + " advanced from " + string(rune(originalX+'0')) + "," + string(rune(originalY+'0')) + " to " + string(rune(r.X+'0')) + "," + string(rune(r.Y+'0'))
			}
		}
	}
	close(action)
	close(log)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	for act := range action {
		for i := range robots {
			act(&robots[i])
			if robots[i].X < extent.Min.X || robots[i].X > extent.Max.X || robots[i].Y < extent.Min.Y || robots[i].Y > extent.Max.Y {
				robots[i].X = 0
				robots[i].Y = 0
			}
		}
	}
	rep <- robots
	close(rep)
}