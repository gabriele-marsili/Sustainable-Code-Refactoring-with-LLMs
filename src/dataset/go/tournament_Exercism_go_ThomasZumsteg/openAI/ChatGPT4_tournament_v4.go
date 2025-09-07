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
	scanner := bufio.NewScanner(reader)
	board := make(scoreBoard)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || line[0] == '#' {
			continue
		}
		if err := board.addGame(line); err != nil {
			return err
		}
	}

	teams := board.getSortedTeams()
	io.WriteString(writer, "Team                           | MP |  W |  D |  L |  P\n")
	for _, team := range teams {
		fmt.Fprintf(writer, "%-31s| %2d | %2d | %2d | %2d | %2d\n", team.name, team.played, team.win, team.draw, team.loss, team.points)
	}
	return nil
}

func (b scoreBoard) addGame(game string) error {
	fields := strings.Split(game, ";")
	if len(fields) != 3 {
		return fmt.Errorf("Game not properly formatted: %s", game)
	}
	home := b.getOrCreateTeam(fields[0])
	away := b.getOrCreateTeam(fields[1])

	switch fields[2] {
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

func (b scoreBoard) getOrCreateTeam(name string) *team {
	if t, exists := b[name]; exists {
		return t
	}
	t := &team{name: name}
	b[name] = t
	return t
}

func (b scoreBoard) getSortedTeams() []team {
	teams := make([]team, 0, len(b))
	for _, t := range b {
		teams = append(teams, *t)
	}
	sort.Slice(teams, func(i, j int) bool {
		if teams[i].points != teams[j].points {
			return teams[i].points > teams[j].points
		}
		if teams[i].win != teams[j].win {
			return teams[i].win > teams[j].win
		}
		return teams[i].name < teams[j].name
	})
	return teams
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