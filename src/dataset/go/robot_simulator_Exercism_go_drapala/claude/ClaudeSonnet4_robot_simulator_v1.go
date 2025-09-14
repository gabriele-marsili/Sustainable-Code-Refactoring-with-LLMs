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
	return "Invalid"
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
	
	select {
	case report <- currentRobot:
	default:
	}
}

// Step 3
type Action3 struct {
	name   string
	action rune
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	defer func() {
		select {
		case log <- name + " finished":
		default:
		}
	}()
	
	var builder strings.Builder
	builder.Grow(len(name) + 32)
	
	for _, r := range script {
		switch r {
		case 'R', 'L', 'A':
			select {
			case action <- Action3{name: name, action: r}:
				builder.Reset()
				builder.WriteString(name)
				builder.WriteString(" ")
				builder.WriteRune(r)
				select {
				case log <- builder.String():
				default:
				}
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
	
	var builder strings.Builder
	builder.Grow(64)
	
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
					if currentRobots[i].Name != act.name && 
						currentRobots[i].Pos.X == newPos.X && 
						currentRobots[i].Pos.Y == newPos.Y {
						collision = true
						break
					}
				}
				
				if !collision {
					robot.Pos = newPos
				} else {
					builder.Reset()
					builder.WriteString(act.name)
					builder.WriteString(" blocked at ")
					builder.WriteString(strconv.Itoa(newPos.X))
					builder.WriteString(",")
					builder.WriteString(strconv.Itoa(newPos.Y))
					select {
					case log <- builder.String():
					default:
					}
				}
			} else {
				builder.Reset()
				builder.WriteString(act.name)
				builder.WriteString(" hit wall at ")
				builder.WriteString(strconv.Itoa(newPos.X))
				builder.WriteString(",")
				builder.WriteString(strconv.Itoa(newPos.Y))
				select {
				case log <- builder.String():
				default:
				}
			}
		}
	}
	
	select {
	case rep <- currentRobots:
	default:
	}
}