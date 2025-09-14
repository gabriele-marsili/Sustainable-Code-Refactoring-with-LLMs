package robot

import (
	"strings"
	"sync"
)

type Dir int

const (
	N Dir = iota
	E
	S
	W
)

var dirStrings = [4]string{"North", "East", "South", "West"}

func Right() Dir {
	return Dir((int(robot.Dir) + 1) % 4)
}

func Left() Dir {
	return Dir((int(robot.Dir) + 3) % 4)
}

func Advance() {
	switch robot.Dir {
	case N:
		robot.Y++
	case E:
		robot.X++
	case S:
		robot.Y--
	case W:
		robot.X--
	}
}

func (d Dir) String() string {
	if d >= 0 && d < 4 {
		return dirStrings[d]
	}
	return ""
}

type Action struct {
	Name   string
	Robot  Step2Robot
	Result Step2Robot
}

func StartRobot(command chan Command, action chan Action) {
	for cmd := range command {
		oldRobot := robot
		switch cmd {
		case 'R':
			robot.Dir = Right()
		case 'L':
			robot.Dir = Left()
		case 'A':
			Advance()
		}
		action <- Action{
			Name:   string(cmd),
			Robot:  oldRobot,
			Result: robot,
		}
	}
	close(action)
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	currentRobot := robot
	for act := range action {
		newRobot := act.Result
		if newRobot.X >= extent.Min.X && newRobot.X <= extent.Max.X &&
			newRobot.Y >= extent.Min.Y && newRobot.Y <= extent.Max.Y {
			currentRobot = newRobot
		}
	}
	report <- currentRobot
	close(report)
}

type Action3 struct {
	Name   string
	Robot  string
	Result Step3Robot
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	robot := Step3Robot{Name: name, X: 0, Y: 0, Dir: N}
	
	for _, cmd := range script {
		oldRobot := robot
		switch cmd {
		case 'R':
			robot.Dir = Dir((int(robot.Dir) + 1) % 4)
		case 'L':
			robot.Dir = Dir((int(robot.Dir) + 3) % 4)
		case 'A':
			switch robot.Dir {
			case N:
				robot.Y++
			case E:
				robot.X++
			case S:
				robot.Y--
			case W:
				robot.X--
			}
		}
		
		action <- Action3{
			Name:   name,
			Robot:  name,
			Result: robot,
		}
		
		log <- name + " " + string(cmd)
	}
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	robotMap := make(map[string]Step3Robot, len(robots))
	for _, r := range robots {
		robotMap[r.Name] = r
	}
	
	var wg sync.WaitGroup
	actionCount := 0
	
	for act := range action {
		actionCount++
		if currentRobot, exists := robotMap[act.Name]; exists {
			newRobot := act.Result
			if newRobot.X >= extent.Min.X && newRobot.X <= extent.Max.X &&
				newRobot.Y >= extent.Min.Y && newRobot.Y <= extent.Max.Y {
				robotMap[act.Name] = newRobot
			}
		}
	}
	
	result := make([]Step3Robot, 0, len(robotMap))
	for _, robot := range robotMap {
		result = append(result, robot)
	}
	
	rep <- result
	close(rep)
	close(log)
}