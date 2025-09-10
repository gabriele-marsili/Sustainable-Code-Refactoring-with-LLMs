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
	CommandChan <- 'R'
}

func Left() {
	CommandChan <- 'L'
}

func Advance() {
	CommandChan <- 'A'
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

type Action int

const (
	TurnRight Action = iota
	TurnLeft
	MoveForward
)

var CommandChan chan rune

func StartRobot(command chan rune, action chan Action) {
	CommandChan = command
	for c := range command {
		switch c {
		case 'R':
			action <- TurnRight
		case 'L':
			action <- TurnLeft
		case 'A':
			action <- MoveForward
		}
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	for a := range action {
		switch a {
		case TurnRight:
			robot.Dir = directions[(int(robot.Dir)+1)%4]
		case TurnLeft:
			robot.Dir = directions[(int(robot.Dir)+3)%4]
		case MoveForward:
			newPos := robot.Pos
			switch robot.Dir {
			case N:
				newPos.Y++
			case E:
				newPos.X++
			case S:
				newPos.Y--
			case W:
				newPos.X--
			}

			if newPos.X >= extent.Min.X && newPos.X <= extent.Max.X &&
				newPos.Y >= extent.Min.Y && newPos.Y <= extent.Max.Y {
				robot.Pos = newPos
			}
		}
	}
	report <- robot
	close(report)
}

// Step 3
// Define Action3 type here.

type Action3 int

const (
	ActRight Action3 = iota
	ActLeft
	ActAdvance
)

func StartRobot3(name, script string, action chan Action3, log chan string) {
	for _, c := range script {
		switch c {
		case 'R':
			action <- ActRight
		case 'L':
			action <- ActLeft
		case 'A':
			action <- ActAdvance
		default:
			log <- name + ": ignoring instruction " + string(c)
		}
	}
	close(action)
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	actions := make([]<-chan Action3, len(robots))
	for i := range robots {
		actionChan := make(chan Action3)
		actions[i] = actionChan
		go StartRobot3(robots[i].Name, robots[i].Script, actionChan, log)
	}

	cases := make([]selectCase, len(robots))
	for i := range robots {
		cases[i] = selectCase{
			action:  actions[i],
			robotID: i,
		}
	}

	activeRobots := len(robots)
	for activeRobots > 0 {
		chosen, action := selectAction(cases)

		if action == nil {
			break // All channels are closed
		}

		robot := &robots[chosen]

		switch *action {
		case ActRight:
			robot.Dir = directions[(int(robot.Dir)+1)%4]
		case ActLeft:
			robot.Dir = directions[(int(robot.Dir)+3)%4]
		case ActAdvance:
			newPos := robot.Pos
			switch robot.Dir {
			case N:
				newPos.Y++
			case E:
				newPos.X++
			case S:
				newPos.Y--
			case W:
				newPos.X--
			}

			if newPos.X >= extent.Min.X && newPos.X <= extent.Max.X &&
				newPos.Y >= extent.Min.Y && newPos.Y <= extent.Max.Y {
				robot.Pos = newPos
			} else {
				log <- robot.Name + ": invalid move"
			}
		}

		// Check if the channel is closed
		select {
		case _, ok := <-actions[chosen]:
			if !ok {
				activeRobots--
				cases[chosen] = selectCase{} // Invalidate the case
			}
		default:
			// Channel is still open, do nothing
		}
	}

	rep <- robots
	close(rep)
	close(log)
}

type selectCase struct {
	action  <-chan Action3
	robotID int
}

func selectAction(cases []selectCase) (int, *Action3) {
	activeCases := make([]selectCase, 0, len(cases))
	for _, c := range cases {
		if c.action != nil {
			activeCases = append(activeCases, c)
		}
	}

	if len(activeCases) == 0 {
		return -1, nil
	}

	if len(activeCases) == 1 {
		action, ok := <-activeCases[0].action
		if !ok {
			return -1, nil
		}
		return activeCases[0].robotID, &action
	}

	selectCases := make([]reflect.SelectCase, len(activeCases))
	for i, c := range activeCases {
		selectCases[i] = reflect.SelectCase{
			Dir:  reflect.SelectRecv,
			Chan: reflect.ValueOf(c.action),
		}
	}

	chosen, recv, recvOK := reflect.Select(selectCases)
	if !recvOK {
		return -1, nil
	}

	action := recv.Interface().(Action3)
	return activeCases[chosen].robotID, &action
}

import "reflect"