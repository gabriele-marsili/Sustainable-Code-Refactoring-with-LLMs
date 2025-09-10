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
	}
}

func (d Dir) String() string {
	directions := []string{"N", "E", "S", "W"}
	if d >= 0 && d < 4 {
		return directions[d]
	}
	return fmt.Sprintf("unrecognized direction %d", d)
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
	positionMap := make(map[Pos]bool)

	for i, robot := range robots {
		if robot.Name == "" {
			log <- "robot has no name"
		}
		if robot.Pos.Northing < extent.Min.Northing || robot.Pos.Northing > extent.Max.Northing || robot.Pos.Easting < extent.Min.Easting || robot.Pos.Easting > extent.Max.Easting {
			log <- "robot placed outside room"
		}
		if _, exists := robotMap[robot.Name]; exists {
			log <- fmt.Sprintf("duplicate name: %s", robot.Name)
		}
		if positionMap[robot.Pos] {
			log <- "robots placed in same position"
		}
		robotMap[robot.Name] = i
		positionMap[robot.Pos] = true
	}

	for action := range actions {
		robotIndex, exists := robotMap[action.name]
		if !exists {
			log <- fmt.Sprintf("no robot with name %s exists", action.name)
			continue
		}

		robot := &robots[robotIndex]
		for _, command := range action.script {
			switch command {
			case 'R':
				robot.Dir = (robot.Dir + 1) % 4
			case 'L':
				robot.Dir = (robot.Dir + 3) % 4
			case 'A':
				if IsBlockedByRobot(robot.Pos, robot.Dir, robots) {
					log <- "running into robot"
					continue
				}
				var moved bool
				*robot, moved = HitWallOrMove(*robot, extent)
				if !moved {
					log <- "running into wall"
				}
			}
		}
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
		if robot.Pos.Northing < extent.Max.Northing {
			robot.Pos.Northing++
			return robot, true
		}
	case E:
		if robot.Pos.Easting < extent.Max.Easting {
			robot.Pos.Easting++
			return robot, true
		}
	case S:
		if robot.Pos.Northing > extent.Min.Northing {
			robot.Pos.Northing--
			return robot, true
		}
	case W:
		if robot.Pos.Easting > extent.Min.Easting {
			robot.Pos.Easting--
			return robot, true
		}
	}
	return robot, false
}