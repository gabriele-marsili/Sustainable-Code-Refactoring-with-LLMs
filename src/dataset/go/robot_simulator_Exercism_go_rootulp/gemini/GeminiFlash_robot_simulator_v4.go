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

func StartRobot3(name, script string, actions chan<- Action3, logs chan<- string) {
	for _, command := range script {
		if command != 'A' && command != 'R' && command != 'L' {
			logs <- "invalid script"
			actions <- Action3{name: name, script: ""}
			return
		}
	}
	actions <- Action3{name, script}
}

func Room3(extent Rect, robots []Step3Robot, actions chan Action3, rep chan []Step3Robot, log chan string) {
	robotMap := make(map[string]int, len(robots))
	posMap := make(map[Pos]string, len(robots))

	for index, robot := range robots {
		if robot.Name == "" {
			log <- "robot has no name"
		}
		if robot.Northing < extent.Min.Northing || robot.Northing > extent.Max.Northing || robot.Easting < extent.Min.Easting || robot.Easting > extent.Max.Easting {
			log <- "robot placed outside room"
		}

		if _, ok := robotMap[robot.Name]; ok {
			log <- fmt.Sprintf("duplicate name: %s", robot.Name)
		}
		robotMap[robot.Name] = index

		if _, ok := posMap[robot.Pos]; ok {
			log <- "robots placed in same position"
		}
		posMap[robot.Pos] = robot.Name
	}

	for i := 0; i < len(robots); i++ {
		action := <-actions
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
				for j := range robots {
					if j != robotIndex && robots[j].Pos == newPos {
						log <- "running into robot"
						blocked = true
						break
					}
				}
				if blocked {
					continue
				}

				moved := true
				switch robot.Dir {
				case N:
					if robot.Pos.Northing >= extent.Max.Northing {
						moved = false
					} else {
						robot.Pos.Northing++
					}
				case E:
					if robot.Pos.Easting >= extent.Max.Easting {
						moved = false
					} else {
						robot.Pos.Easting++
					}
				case S:
					if robot.Pos.Northing <= extent.Min.Northing {
						moved = false
					} else {
						robot.Pos.Northing--
					}
				case W:
					if robot.Pos.Easting <= extent.Min.Easting {
						moved = false
					} else {
						robot.Pos.Easting--
					}
				}
				if !moved {
					log <- "running into wall"
				}
			}
		}
		robots[robotIndex] = robot
	}

	rep <- robots
	close(rep)
}