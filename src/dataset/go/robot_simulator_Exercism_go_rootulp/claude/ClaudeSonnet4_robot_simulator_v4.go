package robot

import (
	"fmt"
	"log"
)

// Step 1
const N Dir = 0
const E Dir = 1
const S Dir = 2
const W Dir = 3

var _ fmt.Stringer = Dir(1729)

func Right() {
	Step1Robot.Dir = (Step1Robot.Dir + 1) & 3
}

func Left() {
	Step1Robot.Dir = (Step1Robot.Dir + 3) & 3
}

var advanceDeltas = [4][2]int{
	N: {0, 1},
	E: {1, 0},
	S: {0, -1},
	W: {-1, 0},
}

func Advance() {
	if Step1Robot.Dir > W {
		log.Fatalf("unrecognized direction %d", Step1Robot.Dir)
	}
	delta := advanceDeltas[Step1Robot.Dir]
	Step1Robot.X += delta[0]
	Step1Robot.Y += delta[1]
}

var dirStrings = [5]string{"N", "E", "S", "W", ""}

func (d Dir) String() string {
	if d <= W {
		return dirStrings[d]
	}
	return fmt.Sprintf("unrecognized direction %d", d)
}

// Step 2
type Action uint

func (s *Step2Robot) Initialize(X, Y RU) {
	log.Printf("Initializing robot at %d,%d facing %s", s.Pos.Easting, s.Pos.Northing, s.Dir)
	s.Pos.Easting = X
	s.Pos.Northing = Y
}

func (s *Step2Robot) RotateRight() {
	s.Dir = (s.Dir + 1) & 3
}

func (s *Step2Robot) RotateLeft() {
	s.Dir = (s.Dir + 3) & 3
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
			robot.Dir = (robot.Dir + 1) & 3
		case 'L':
			robot.Dir = (robot.Dir + 3) & 3
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
	robotNames := make(map[string]int, len(robots))
	robotPositions := make(map[Pos]bool, len(robots))
	
	for index, robot := range robots {
		if robot.Name == "" {
			log <- "robot has no name"
		}
		if robot.Northing < extent.Min.Northing || robot.Northing > extent.Max.Northing || robot.Easting < extent.Min.Easting || robot.Easting > extent.Max.Easting {
			log <- "robot placed outside room"
		}
		if _, exists := robotNames[robot.Name]; exists {
			log <- fmt.Sprintf("duplicate name: %s", robot.Name)
		} else {
			robotNames[robot.Name] = index
		}
		if robotPositions[robot.Pos] {
			log <- "robots placed in same position"
		} else {
			robotPositions[robot.Pos] = true
		}
	}

	var action Action3
	for range robots {
		action = <-actions
		robotIndex, exists := robotNames[action.name]
		if !exists {
			log <- fmt.Sprintf("no robot with name %s exists", action.name)
			continue
		}
		
		robot := robots[robotIndex]
		for _, command := range action.script {
			switch command {
			case 'R':
				robot.Dir = (robot.Dir + 1) & 3
			case 'L':
				robot.Dir = (robot.Dir + 3) & 3
			case 'A':
				if IsBlockedByRobot(robot.Pos, robot.Dir, robots) {
					log <- "running into robot"
					continue
				}
				var moved bool
				robot, moved = HitWallOrMove(robot, extent)
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
		}
		robot.Pos.Northing++
	case E:
		if robot.Pos.Easting >= extent.Max.Easting {
			return robot, false
		}
		robot.Pos.Easting++
	case S:
		if robot.Pos.Northing <= extent.Min.Northing {
			return robot, false
		}
		robot.Pos.Northing--
	case W:
		if robot.Pos.Easting <= extent.Min.Easting {
			return robot, false
		}
		robot.Pos.Easting--
	}
	return robot, true
}