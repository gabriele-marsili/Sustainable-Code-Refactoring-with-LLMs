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
		if isComment(line) || isEmptyLine(line) {
			continue
		}

		a, b, outcome, err := parseLine(line)
		if err != nil {
			return err
		}

		initializeTeamIfNotExists(teamsToScores, a)
		initializeTeamIfNotExists(teamsToScores, b)

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

	io.WriteString(w, getTable(teamsToScores))
	return nil
}

func getTable(teamsToScores map[string]*stat) string {
	sorted := sortTeamsByPointsThenAlphabetically(teamsToScores)
	
	var result strings.Builder
	result.Grow(len(sorted)*80 + 50) // Pre-allocate approximate capacity
	
	result.WriteString(fmt.Sprintf("%-30s |%3s |%3s |%3s |%3s |%3s\n", "Team", "MP", "W", "D", "L", "P"))
	
	for _, stat := range sorted {
		result.WriteString(fmt.Sprintf("%-30s |%3d |%3d |%3d |%3d |%3d\n", stat.Name, stat.MatchesPlayed, stat.Wins, stat.Draws, stat.Loses, stat.Points))
	}
	
	return result.String()
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

func isComment(line string) bool {
	return len(line) > 0 && line[0] == '#'
}

func isEmptyLine(line string) bool {
	return strings.TrimSpace(line) == ""
}

func getLines(r io.Reader) ([]string, error) {
	input, err := io.ReadAll(r)
	if err != nil {
		return []string{}, err
	}
	lines := strings.Split(string(input), "\n")
	return lines, nil
}

func initializeTeamIfNotExists(teamsToScores map[string]*stat, team string) {
	if _, ok := teamsToScores[team]; !ok {
		teamsToScores[team] = &stat{
			Name: team,
		}
	}
}

func parseLine(line string) (string, string, string, error) {
	parts := strings.Split(line, ";")
	if len(parts) < 3 {
		return "", "", "", fmt.Errorf("unexpected number of parts in line. Expected 3 parts delimited by semicolon. Got %d parts", len(parts))
	}
	return parts[0], parts[1], parts[2], nil
}

func handleWin(teamsToScores map[string]*stat, winner string, loser string) {
	winnerStat := teamsToScores[winner]
	loserStat := teamsToScores[loser]
	
	winnerStat.Wins++
	winnerStat.Points += 3
	winnerStat.MatchesPlayed++
	
	loserStat.Loses++
	loserStat.MatchesPlayed++
}

func handleDraw(teamsToScores map[string]*stat, a string, b string) {
	aStat := teamsToScores[a]
	bStat := teamsToScores[b]
	
	aStat.Draws++
	aStat.Points++
	aStat.MatchesPlayed++
	
	bStat.Draws++
	bStat.Points++
	bStat.MatchesPlayed++
}