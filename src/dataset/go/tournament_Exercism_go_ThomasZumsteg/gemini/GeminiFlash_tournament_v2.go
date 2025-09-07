package tournament

import (
	"bufio"
	"fmt"
	"io"
	"sort"
	"strings"
)

// TestVersion is the verion of the unit tests that this will pass
const TestVersion = 2

// scoreBoard keeps track of the score
type scoreBoard map[string]*team

// team is the win/loss record of the team
type team struct {
	name                            string
	played, win, loss, draw, points int
}

/*Tally counts up the wins and losses for a sports season.*/
func Tally(reader io.Reader, writer io.Writer) error {
	board := make(scoreBoard)
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		if err := board.addGame(line); err != nil {
			return err
		}
	}
	if err := scanner.Err(); err != nil {
		return err
	}

	teams := make([]team, 0, len(board))
	for _, team := range board {
		teams = append(teams, *team)
	}

	sort.Sort(byScore(teams))

	sb := strings.Builder{}
	sb.WriteString("Team                           | MP |  W |  D |  L |  P\n")
	for _, team := range teams {
		sb.WriteString(team.String())
		sb.WriteString("\n")
	}

	_, err := io.WriteString(writer, sb.String())
	return err
}

/*addGame validates and adds a game to the scoreboard.*/
func (b scoreBoard) addGame(game string) error {
	fields := strings.SplitN(game, ";", 3)
	if len(fields) != 3 {
		return fmt.Errorf("Game not properly formatted: %s", game)
	}

	homeName := fields[0]
	awayName := fields[1]
	result := fields[2]

	home, homeOk := b[homeName]
	if !homeOk {
		home = &team{name: homeName}
		b[homeName] = home
	}

	away, awayOk := b[awayName]
	if !awayOk {
		away = &team{name: awayName}
		b[awayName] = away
	}

	switch result {
	case "win":
		home.addWin()
		away.addLoss()
	case "loss":
		home.addLoss()
		away.addWin()
	case "draw":
		home.addDraw()
		away.addDraw()
	default:
		return fmt.Errorf("Unknown win condition: %s", game)
	}

	return nil
}

//byScore sorts the teams by points, then by wins, then aphabetically
type byScore []team

func (t byScore) Len() int      { return len(t) }
func (t byScore) Swap(i, j int) { t[i], t[j] = t[j], t[i] }
func (t byScore) Less(i, j int) bool {
	if t[i].points != t[j].points {
		return t[i].points > t[j].points
	}
	if t[i].win != t[j].win {
		return t[i].win > t[j].win
	}
	return t[i].name < t[j].name
}

/*addWin adds a win to the team.*/
func (t *team) addWin() {
	t.played++
	t.win++
	t.points += 3
}

/*addLoss adds a loss to the team.*/
func (t *team) addLoss() {
	t.played++
	t.loss++
}

/*addDraw adds a draw to the team.*/
func (t *team) addDraw() {
	t.played++
	t.draw++
	t.points++
}

/*String gets the record of the team.*/
func (t *team) String() string {
	return fmt.Sprintf("%-31s| %2d | %2d | %2d | %2d | %2d", t.name, t.played, t.win, t.draw, t.loss, t.points)
}