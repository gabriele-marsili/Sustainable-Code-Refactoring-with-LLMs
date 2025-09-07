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
		line := scanner.Text()
		if len(line) == 0 || line[0] == '#' {
			continue
		}
		if err := board.addGame(line); err != nil {
			return err
		}
	}

	teams := make([]team, 0, len(board))
	for _, t := range board {
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

	var buf strings.Builder
	buf.Grow(len(teams)*50 + 50)
	buf.WriteString("Team                           | MP |  W |  D |  L |  P\n")
	
	for i := range teams {
		buf.WriteString(teams[i].String())
		buf.WriteByte('\n')
	}
	
	_, err := io.WriteString(writer, buf.String())
	return err
}

func (b scoreBoard) addGame(game string) error {
	semicolonCount := strings.Count(game, ";")
	if semicolonCount != 2 {
		return fmt.Errorf("Game not properly formatted: %s", game)
	}
	
	firstSemi := strings.IndexByte(game, ';')
	lastSemi := strings.LastIndexByte(game, ';')
	
	homeTeam := game[:firstSemi]
	awayTeam := game[firstSemi+1 : lastSemi]
	result := game[lastSemi+1:]
	
	home := b[homeTeam]
	if home == nil {
		home = &team{name: homeTeam}
		b[homeTeam] = home
	}
	
	away := b[awayTeam]
	if away == nil {
		away = &team{name: awayTeam}
		b[awayTeam] = away
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

func (b scoreBoard) getTeams() []team {
	teams := make([]team, 0, len(b))
	for _, team := range b {
		teams = append(teams, *team)
	}
	return teams
}

type byScore []team

func (t byScore) Len() int      { return len(t) }
func (t byScore) Swap(i, j int) { t[i], t[j] = t[j], t[i] }
func (t byScore) Less(i, j int) bool {
	if t[i].points != t[j].points {
		return t[i].points > t[j].points
	} else if t[i].win != t[j].win {
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
	return fmt.Sprintf("%-31s| %2d | %2d | %2d | %2d | %2d", t.name, t.played, t.win, t.draw, t.loss, t.points)
}