package robot

import (
	"strconv"
	"strings"
)

// Step 1
type Dir int

const (
	N Dir = iota
	E
	S
	W
)

var dirStrings = [4]string{"North", "East", "South", "West"}

func Right() {
	panic("Please implement the Right function")
}

func Left() {
	panic("Please implement the Left function")
}

func Advance() {
	panic("Please implement the Advance function")
}

func (d Dir) String() string {
	if d >= 0 && d < 4 {
		return dirStrings[d]
	}
	return "Unknown"
}

// Step 2
type Action struct {
	name   string
	action rune
}

func StartRobot(command chan Command, action chan Action) {
	defer close(action)
	
	for cmd := range command {
		name := cmd.name
		script := cmd.script
		
		for _, r := range script {
			switch r {
			case 'R', 'L', 'A':
				select {
				case action <- Action{name: name, action: r}:
				default:
					return
				}
			}
		}
	}
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	defer close(report)
	
	currentRobot := robot
	
	for act := range action {
		switch act.action {
		case 'R':
			currentRobot.Dir = (currentRobot.Dir + 1) % 4
		case 'L':
			currentRobot.Dir = (currentRobot.Dir + 3) % 4
		case 'A':
			newPos := currentRobot.Pos
			switch currentRobot.Dir {
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
				currentRobot.Pos = newPos
			}
		}
	}
	
	report <- currentRobot
}

// Step 3
type Action3 struct {
	name   string
	action rune
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	defer func() {
		if log != nil {
			log <- name + " finished"
		}
	}()
	
	scriptRunes := []rune(script)
	for _, r := range scriptRunes {
		switch r {
		case 'R', 'L', 'A':
			select {
			case action <- Action3{name: name, action: r}:
			default:
				return
			}
		}
	}
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	defer close(rep)
	defer close(log)
	
	robotMap := make(map[string]*Step3Robot, len(robots))
	currentRobots := make([]Step3Robot, len(robots))
	
	for i := range robots {
		currentRobots[i] = robots[i]
		robotMap[robots[i].Name] = &currentRobots[i]
	}
	
	var logBuilder strings.Builder
	
	for act := range action {
		robot, exists := robotMap[act.name]
		if !exists {
			continue
		}
		
		switch act.action {
		case 'R':
			robot.Dir = (robot.Dir + 1) % 4
		case 'L':
			robot.Dir = (robot.Dir + 3) % 4
		case 'A':
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
				
				collision := false
				for i := range currentRobots {
					if currentRobots[i].Name != robot.Name && 
						currentRobots[i].Pos.X == newPos.X && 
						currentRobots[i].Pos.Y == newPos.Y {
						collision = true
						break
					}
				}
				
				if !collision {
					robot.Pos = newPos
				}
			}
		}
		
		logBuilder.Reset()
		logBuilder.WriteString(act.name)
		logBuilder.WriteString(" ")
		logBuilder.WriteRune(act.action)
		logBuilder.WriteString(" (")
		logBuilder.WriteString(strconv.Itoa(robot.Pos.X))
		logBuilder.WriteString(",")
		logBuilder.WriteString(strconv.Itoa(robot.Pos.Y))
		logBuilder.WriteString(") ")
		logBuilder.WriteString(robot.Dir.String())
		
		select {
		case log <- logBuilder.String():
		default:
		}
	}
	
	rep <- currentRobots
}