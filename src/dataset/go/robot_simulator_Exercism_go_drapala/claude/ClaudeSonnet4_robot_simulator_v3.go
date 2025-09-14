package robot

import (
	"fmt"
	"strings"
)

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
	dx := [4]int{0, 1, 0, -1}
	dy := [4]int{1, 0, -1, 0}
	
	for act := range action {
		switch act.action {
		case 'R':
			currentRobot.Dir = (currentRobot.Dir + 1) % 4
		case 'L':
			currentRobot.Dir = (currentRobot.Dir + 3) % 4
		case 'A':
			newX := currentRobot.Pos.X + dx[currentRobot.Dir]
			newY := currentRobot.Pos.Y + dy[currentRobot.Dir]
			
			if newX >= extent.Min.X && newX <= extent.Max.X &&
				newY >= extent.Min.Y && newY <= extent.Max.Y {
				currentRobot.Pos.X = newX
				currentRobot.Pos.Y = newY
			}
		}
	}
	
	select {
	case report <- currentRobot:
	default:
	}
}

type Action3 struct {
	name   string
	action rune
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	defer func() {
		select {
		case log <- fmt.Sprintf("%s finished", name):
		default:
		}
	}()
	
	script = strings.ToUpper(script)
	
	for _, r := range script {
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
	copy(currentRobots, robots)
	
	for i := range currentRobots {
		robotMap[currentRobots[i].Name] = &currentRobots[i]
	}
	
	dx := [4]int{0, 1, 0, -1}
	dy := [4]int{1, 0, -1, 0}
	
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
			newX := robot.Pos.X + dx[robot.Dir]
			newY := robot.Pos.Y + dy[robot.Dir]
			
			if newX >= extent.Min.X && newX <= extent.Max.X &&
				newY >= extent.Min.Y && newY <= extent.Max.Y {
				
				collision := false
				for i := range currentRobots {
					if currentRobots[i].Name != act.name &&
						currentRobots[i].Pos.X == newX &&
						currentRobots[i].Pos.Y == newY {
						collision = true
						break
					}
				}
				
				if !collision {
					robot.Pos.X = newX
					robot.Pos.Y = newY
				}
			}
		}
	}
	
	select {
	case rep <- currentRobots:
	default:
	}
}