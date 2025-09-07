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

		line = strings.TrimSpace(line)
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
			teamsToScores[a].Wins++
			teamsToScores[a].Points += 3
			teamsToScores[b].Loses++
			teamsToScores[a].MatchesPlayed++
			teamsToScores[b].MatchesPlayed++
		case "loss":
			teamsToScores[b].Wins++
			teamsToScores[b].Points += 3
			teamsToScores[a].Loses++
			teamsToScores[a].MatchesPlayed++
			teamsToScores[b].MatchesPlayed++
		case "draw":
			teamsToScores[a].Draws++
			teamsToScores[b].Draws++
			teamsToScores[a].Points++
			teamsToScores[b].Points++
			teamsToScores[a].MatchesPlayed++
			teamsToScores[b].MatchesPlayed++
		default:
			return fmt.Errorf("unexpected outcome %s", outcome)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	table := getTable(teamsToScores)
	_, err := io.WriteString(w, table)
	return err
}

func getTable(teamsToScores map[string]*stat) string {
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

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("%-30s |%3s |%3s |%3s |%3s |%3s\n", "Team", "MP", "W", "D", "L", "P"))
	for _, stat := range sorted {
		sb.WriteString(fmt.Sprintf("%-30s |%3d |%3d |%3d |%3d |%3d\n", stat.Name, stat.MatchesPlayed, stat.Wins, stat.Draws, stat.Loses, stat.Points))
	}
	return sb.String()
}

func parseLine(line string) (string, string, string, error) {
	parts := strings.SplitN(line, ";", 3)
	if len(parts) != 3 {
		return "", "", "", fmt.Errorf("unexpected number of parts in line. Expected 3 parts delimited by semicolon. Got %d parts", len(parts))
	}
	return parts[0], parts[1], parts[2], nil
}