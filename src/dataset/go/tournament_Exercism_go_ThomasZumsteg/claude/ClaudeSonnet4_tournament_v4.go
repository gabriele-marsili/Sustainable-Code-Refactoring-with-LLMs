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
	
	sort.Sort(byScore(teams))
	
	var sb strings.Builder
	sb.Grow(len(teams)*60 + 50)
	sb.WriteString("Team                           | MP |  W |  D |  L |  P\n")
	
	for i := range teams {
		sb.WriteString(teams[i].String())
		sb.WriteByte('\n')
	}
	
	_, err := writer.Write([]byte(sb.String()))
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
	
	home, homeOk := b[homeTeam]
	if !homeOk {
		home = &team{name: homeTeam}
		b[homeTeam] = home
	}
	
	away, awayOk := b[awayTeam]
	if !awayOk {
		away = &team{name: awayTeam}
		b[awayTeam] = away
	}
	
	switch result {
	case "win":
		home.played++
		home.win++
		home.points += 3
		away.played++
		away.loss++
	case "loss":
		home.played++
		home.loss++
		away.played++
		away.win++
		away.points += 3
	case "draw":
		home.played++
		home.draw++
		home.points++
		away.played++
		away.draw++
		away.points++
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

func (t *team) String() string {
	return fmt.Sprintf("%-31s| %2d | %2d | %2d | %2d | %2d", t.name, t.played, t.win, t.draw, t.loss, t.points)
}