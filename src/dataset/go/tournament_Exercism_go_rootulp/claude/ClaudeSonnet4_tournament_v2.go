package tournament

import (
	"bufio"
	"fmt"
	"io"
	"sort"
	"strings"
)

type stat struct {
	Name          string
	MatchesPlayed int
	Wins          int
	Draws         int
	Loses         int
	Points        int
}

func Tally(r io.Reader, w io.Writer) error {
	teamsToScores := make(map[string]*stat)
	scanner := bufio.NewScanner(r)
	
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 || line[0] == '#' {
			continue
		}

		a, b, outcome, err := parseLine(line)
		if err != nil {
			return err
		}

		if teamsToScores[a] == nil {
			teamsToScores[a] = &stat{Name: a}
		}
		if teamsToScores[b] == nil {
			teamsToScores[b] = &stat{Name: b}
		}

		switch outcome {
		case "win":
			handleWin(teamsToScores[a], teamsToScores[b])
		case "loss":
			handleWin(teamsToScores[b], teamsToScores[a])
		case "draw":
			handleDraw(teamsToScores[a], teamsToScores[b])
		default:
			return fmt.Errorf("unexpected outcome %s", outcome)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	writeTable(w, teamsToScores)
	return nil
}

func writeTable(w io.Writer, teamsToScores map[string]*stat) {
	sorted := make([]*stat, 0, len(teamsToScores))
	for _, stat := range teamsToScores {
		sorted = append(sorted, stat)
	}
	
	sort.Slice(sorted, func(i, j int) bool {
		if sorted[i].Points != sorted[j].Points {
			return sorted[i].Points > sorted[j].Points
		}
		return sorted[i].Name < sorted[j].Name
	})

	fmt.Fprintf(w, "%-30s |%3s |%3s |%3s |%3s |%3s\n", "Team", "MP", "W", "D", "L", "P")
	for _, stat := range sorted {
		fmt.Fprintf(w, "%-30s |%3d |%3d |%3d |%3d |%3d\n", stat.Name, stat.MatchesPlayed, stat.Wins, stat.Draws, stat.Loses, stat.Points)
	}
}

func parseLine(line string) (a string, b string, outcome string, err error) {
	parts := strings.Split(line, ";")
	if len(parts) < 3 {
		return "", "", "", fmt.Errorf("unexpected number of parts in line. Expected 3 parts delimited by semicolon. Got %d parts", len(parts))
	}
	return parts[0], parts[1], parts[2], nil
}

func handleWin(winner *stat, loser *stat) {
	winner.Wins++
	winner.Points += 3
	winner.MatchesPlayed++
	loser.Loses++
	loser.MatchesPlayed++
}

func handleDraw(a *stat, b *stat) {
	a.Draws++
	a.Points++
	a.MatchesPlayed++
	b.Draws++
	b.Points++
	b.MatchesPlayed++
}