package tournament

import (
	"bufio"
	"fmt"
	"io"
	"sort"
	"strings"
)

const TestVersion = 2

type scoreBoard map[string]*team

type team struct {
	name                            string
	played, win, loss, draw, points int
}

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

	teams := make([]team, 0, len(board))
	for _, team := range board {
		teams = append(teams, *team)
	}

	sort.Sort(byScore(teams))

	header := "Team                           | MP |  W |  D |  L |  P\n"
	if _, err := io.WriteString(writer, header); err != nil {
		return err
	}

	var sb strings.Builder
	for _, team := range teams {
		sb.WriteString(team.String())
		sb.WriteString("\n")
		if _, err := io.WriteString(writer, sb.String()); err != nil {
			return err
		}
		sb.Reset()
	}

	return nil
}

func (b scoreBoard) addGame(game string) error {
	fields := strings.SplitN(game, ";", 3)
	if len(fields) != 3 {
		return fmt.Errorf("Game not properly formatted: %s", game)
	}

	homeName, awayName, result := fields[0], fields[1], fields[2]

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

func (t *team) addWin() {
	t.played++
	t.win++
	t.points += 3
}

func (t *team) addLoss() {
	t.played++
	t.loss++
}

func (t *team) addDraw() {
	t.played++
	t.draw++
	t.points++
}

func (t *team) String() string {
	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("%-31s| %2d | %2d | %2d | %2d | %2d", t.name, t.played, t.win, t.draw, t.loss, t.points))
	return sb.String()
}