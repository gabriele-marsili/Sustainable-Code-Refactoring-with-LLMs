package robot

import (
	"fmt"
	"log"
)

// Step 1
const (
	N Dir = iota
	E
	S
	W
)

var _ fmt.Stringer = Dir(1729)

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
	default:
		log.Fatalf("unrecognized direction %d", Step1Robot.Dir)
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
		return fmt.Sprintf("unrecognized direction %d", d)
	}
}

// Step 2
type Action uint

func (s *Step2Robot) Initialize(X, Y RU) {
	log.Printf("Initializing robot at %d,%d facing %s", s.Pos.Easting, s.Pos.Northing, s.Dir)
	s.Pos.Easting = X
	s.Pos.Northing = Y
}

func (s *Step2Robot) RotateRight() {
	s.Dir = (s.Dir + 1) % 4
}

func (s *Step2Robot) RotateLeft() {
	s.Dir = (s.Dir + 3) % 4
}

func StartRobot(commands <-chan Command, actions chan<- Action) {
	for command := range commands {
		actions <- Action(command)
	}
	close(actions)
}

func Room(extent Rect, robot Step2Robot, actions <-chan Action, report chan<- Step2Robot) {
	for action := range actions {
		switch action {
		case 'R':
			robot.RotateRight()
		case 'L':
			robot.RotateLeft()
		case 'A':
			switch robot.Dir {
			case N:
				if robot.Pos.Northing < extent.Max.Northing {
					robot.Pos.Northing++
				}
			case E:
				if robot.Pos.Easting < extent.Max.Easting {
					robot.Pos.Easting++
				}
			case S:
				if robot.Pos.Northing > extent.Min.Northing {
					robot.Pos.Northing--
				}
			case W:
				if robot.Pos.Easting > extent.Min.Easting {
					robot.Pos.Easting--
				}
			}
		default:
			log.Fatalf("unrecognized action %d", action)
		}
	}
	report <- robot
	close(report)
}

// Step 3
type Action3 struct {
	name   string
	script string
}

func isCommand(cmd rune) bool {
	return cmd == 'A' || cmd == 'R' || cmd == 'L'
}

func StartRobot3(name, script string, actions chan<- Action3, logs chan<- string) {
	for _, command := range script {
		if !isCommand(command) {
			logs <- "invalid script"
			actions <- Action3{name: name, script: ""}
			return
		}
	}
	actions <- Action3{name, script}
}

func Room3(extent Rect, robots []Step3Robot, actions chan Action3, rep chan []Step3Robot, log chan string) {
	robotMap := make(map[string]int)
	posMap := make(map[Pos]string)

	for index, robot := range robots {
		if robot.Name == "" {
			log <- "robot has no name"
		}
		if robot.Northing < extent.Min.Northing || robot.Northing > extent.Max.Northing || robot.Easting < extent.Min.Easting || robot.Easting > extent.Max.Easting {
			log <- "robot placed outside room"
		}

		if _, ok := robotMap[robot.Name]; ok {
			log <- fmt.Sprintf("duplicate name: %s", robot.Name)
		} else {
			robotMap[robot.Name] = index
		}

		if _, ok := posMap[robot.Pos]; ok {
			log <- "robots placed in same position"
		} else {
			posMap[robot.Pos] = robot.Name
		}
	}

	for action := range actions {
		robotIndex, ok := robotMap[action.name]
		if !ok {
			log <- fmt.Sprintf("no robot with name %s exists", action.name)
			continue
		}

		robot := robots[robotIndex]

		for _, command := range action.script {
			switch command {
			case 'R':
				robot.Dir = (robot.Dir + 1) % 4
			case 'L':
				robot.Dir = (robot.Dir + 3) % 4
			case 'A':
				newPos := robot.Pos
				switch robot.Dir {
				case N:
					newPos.Northing++
				case E:
					newPos.Easting++
				case S:
					newPos.Northing--
				case W:
					newPos.Easting--
				}

				blocked := false
				for i := range robots {
					if i != robotIndex && robots[i].Pos == newPos {
						blocked = true
						break
					}
				}

				if blocked {
					log <- "running into robot"
					continue
				}

				moved := true
				switch robot.Dir {
				case N:
					if newPos.Northing > extent.Max.Northing {
						moved = false
					}
				case E:
					if newPos.Easting > extent.Max.Easting {
						moved = false
					}
				case S:
					if newPos.Northing < extent.Min.Northing {
						moved = false
					}
				case W:
					if newPos.Easting < extent.Min.Easting {
						moved = false
					}
				}

				if !moved {
					log <- "running into wall"
					continue
				}

				robot.Pos = newPos
			}
		}
		robots[robotIndex] = robot
	}

	rep <- robots
	close(rep)
}

func IsBlockedByRobot(position Pos, direction Dir, robots []Step3Robot) bool {
	newPos := position
	switch direction {
	case N:
		newPos.Northing++
	case E:
		newPos.Easting++
	case S:
		newPos.Northing--
	case W:
		newPos.Easting--
	}
	for _, robot := range robots {
		if robot.Pos == newPos {
			return true
		}
	}
	return false
}

func HitWallOrMove(robot Step3Robot, extent Rect) (Step3Robot, bool) {
	switch robot.Dir {
	case N:
		if robot.Pos.Northing >= extent.Max.Northing {
			return robot, false
		} else {
			robot.Pos.Northing++
		}
	case E:
		if robot.Pos.Easting >= extent.Max.Easting {
			return robot, false
		} else {
			robot.Pos.Easting++
		}
	case S:
		if robot.Pos.Northing <= extent.Min.Northing {
			return robot, false
		} else {
			robot.Pos.Northing--
		}
	case W:
		if robot.Pos.Easting <= extent.Min.Easting {
			return robot, false
		} else {
			robot.Pos.Easting--
		}
	}
	return robot, true
}