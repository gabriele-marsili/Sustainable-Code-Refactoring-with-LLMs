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
	log.Printf("Initializing robot at %d,%d facing %s", s.Pos.Easting, s.Pos.Northing, s.Dir)
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

	for range robots {
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
				newPos := calculateNewPosition(robot.Pos, robot.Dir)
				if _, blocked := posMap[newPos]; blocked {
					log <- "running into robot"
					continue
				}

				var moved bool
				robot, moved = HitWallOrMove(robot, extent, robot.Pos, robot.Dir)
				if !moved {
					log <- "running into wall"
				} else {
					delete(posMap, robot.Pos)
					posMap[newPos] = robot.Name
					robot.Pos = newPos
				}
			}
		}
		robots[robotIndex] = robot
	}
	rep <- robots
	close(rep)
}

func calculateNewPosition(position Pos, direction Dir) Pos {
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
	return newPos
}

func HitWallOrMove(robot Step3Robot, extent Rect, currentPos Pos, direction Dir) (Step3Robot, bool) {
	newRobot := robot
	moved := true

	switch direction {
	case N:
		if currentPos.Northing >= extent.Max.Northing {
			return robot, false
		}
		newRobot.Pos.Northing++
	case E:
		if currentPos.Easting >= extent.Max.Easting {
			return robot, false
		}
		newRobot.Pos.Easting++
	case S:
		if currentPos.Northing <= extent.Min.Northing {
			return robot, false
		}
		newRobot.Pos.Northing--
	case W:
		if currentPos.Easting <= extent.Min.Easting {
			return robot, false
		}
		newRobot.Pos.Easting--
	}

	return newRobot, moved
}