package robot

// See defs.go for other definitions

// Step 1
type Dir int

const (
	N Dir = iota
	E
	S
	W
)

var directionDeltas = [4][2]int{
	N: {0, 1},
	E: {1, 0},
	S: {0, -1},
	W: {-1, 0},
}

var directionNames = [4]string{
	N: "North",
	E: "East",
	S: "South",
	W: "West",
}

func Right() {
	Step1Robot.Dir = (Step1Robot.Dir + 1) % 4
}

func Left() {
	Step1Robot.Dir = (Step1Robot.Dir + 3) % 4
}

func Advance() {
	delta := directionDeltas[Step1Robot.Dir]
	Step1Robot.X += delta[0]
	Step1Robot.Y += delta[1]
}

func (d Dir) String() string {
	if d >= 0 && d < 4 {
		return directionNames[d]
	}
	return ""
}

// Step 2
type Action int

func StartRobot(command chan Command, action chan Action) {
	defer close(action)
	for cmd := range command {
		switch cmd {
		case 'R':
			action <- 1
		case 'L':
			action <- 2
		case 'A':
			action <- 3
		}
	}
}

func Room(extent Rect, robot Step2Robot, action chan Action, report chan Step2Robot) {
	defer close(report)
	
	currentRobot := robot
	
	for act := range action {
		switch act {
		case 1: // Right
			currentRobot.Dir = (currentRobot.Dir + 1) % 4
		case 2: // Left
			currentRobot.Dir = (currentRobot.Dir + 3) % 4
		case 3: // Advance
			delta := directionDeltas[currentRobot.Dir]
			newX := currentRobot.X + delta[0]
			newY := currentRobot.Y + delta[1]
			
			if newX >= extent.Min.X && newX <= extent.Max.X && 
			   newY >= extent.Min.Y && newY <= extent.Max.Y {
				currentRobot.X = newX
				currentRobot.Y = newY
			}
		}
	}
	
	report <- currentRobot
}

// Step 3
type Action3 struct {
	Name   string
	Action Action
}

func StartRobot3(name, script string, action chan Action3, log chan string) {
	defer func() {
		if action != nil {
			close(action)
		}
	}()
	
	for _, cmd := range script {
		var act Action
		switch cmd {
		case 'R':
			act = 1
		case 'L':
			act = 2
		case 'A':
			act = 3
		default:
			continue
		}
		
		select {
		case action <- Action3{Name: name, Action: act}:
		case <-log:
			return
		}
	}
}

func Room3(extent Rect, robots []Step3Robot, action chan Action3, rep chan []Step3Robot, log chan string) {
	defer close(rep)
	
	robotMap := make(map[string]*Step3Robot, len(robots))
	currentRobots := make([]Step3Robot, len(robots))
	copy(currentRobots, robots)
	
	for i := range currentRobots {
		robotMap[currentRobots[i].Name] = &currentRobots[i]
	}
	
	for act := range action {
		robot, exists := robotMap[act.Name]
		if !exists {
			continue
		}
		
		switch act.Action {
		case 1: // Right
			robot.Dir = (robot.Dir + 1) % 4
		case 2: // Left
			robot.Dir = (robot.Dir + 3) % 4
		case 3: // Advance
			delta := directionDeltas[robot.Dir]
			newX := robot.X + delta[0]
			newY := robot.Y + delta[1]
			
			if newX >= extent.Min.X && newX <= extent.Max.X && 
			   newY >= extent.Min.Y && newY <= extent.Max.Y {
				
				collision := false
				for i := range currentRobots {
					if currentRobots[i].Name != robot.Name && 
					   currentRobots[i].X == newX && currentRobots[i].Y == newY {
						collision = true
						break
					}
				}
				
				if !collision {
					robot.X = newX
					robot.Y = newY
				}
			}
		}
	}
	
	rep <- currentRobots
}