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
	teamsToScores := map[string]*stat{}
	scanner := bufio.NewScanner(r)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		a, b, outcome, err := parseLine(line)
		if err != nil {
			return err
		}

		if _, ok := teamsToScores[a]; !ok {
			teamsToScores[a] = &stat{Name: a}
		}
		if _, ok := teamsToScores[b]; !ok {
			teamsToScores[b] = &stat{Name: b}
		}

		switch outcome {
		case "win":
			handleWin(teamsToScores, a, b)
		case "loss":
			handleWin(teamsToScores, b, a)
		case "draw":
			handleDraw(teamsToScores, a, b)
		default:
			return fmt.Errorf("unexpected outcome %s", outcome)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	_, err := w.Write([]byte(getTable(teamsToScores)))
	return err
}

func getTable(teamsToScores map[string]*stat) string {
	sorted := sortTeamsByPointsThenAlphabetically(teamsToScores)
	var sb strings.Builder
	fmt.Fprintf(&sb, "%-30s |%3s |%3s |%3s |%3s |%3s\n", "Team", "MP", "W", "D", "L", "P")
	for _, stat := range sorted {
		fmt.Fprintf(&sb, "%-30s |%3d |%3d |%3d |%3d |%3d\n", stat.Name, stat.MatchesPlayed, stat.Wins, stat.Draws, stat.Loses, stat.Points)
	}
	return sb.String()
}

func sortTeamsByPointsThenAlphabetically(teamsToScores map[string]*stat) []*stat {
	result := make([]*stat, 0, len(teamsToScores))
	for _, stat := range teamsToScores {
		result = append(result, stat)
	}
	sort.Slice(result, func(i, j int) bool {
		if result[i].Points != result[j].Points {
			return result[i].Points > result[j].Points
		}
		return result[i].Name < result[j].Name
	})
	return result
}

func parseLine(line string) (string, string, string, error) {
	parts := strings.Split(line, ";")
	if len(parts) != 3 {
		return "", "", "", fmt.Errorf("invalid line format: %s", line)
	}
	return parts[0], parts[1], parts[2], nil
}

func handleWin(teamsToScores map[string]*stat, winner, loser string) {
	w := teamsToScores[winner]
	l := teamsToScores[loser]
	w.Wins++
	w.Points += 3
	w.MatchesPlayed++
	l.Loses++
	l.MatchesPlayed++
}

func handleDraw(teamsToScores map[string]*stat, a, b string) {
	ta := teamsToScores[a]
	tb := teamsToScores[b]
	ta.Draws++
	tb.Draws++
	ta.Points++
	tb.Points++
	ta.MatchesPlayed++
	tb.MatchesPlayed++
}