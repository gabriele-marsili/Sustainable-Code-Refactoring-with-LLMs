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

		parts := strings.Split(line, ";")
		if len(parts) != 3 {
			return fmt.Errorf("invalid input line: %s", line)
		}

		a, b, outcome := parts[0], parts[1], parts[2]

		teamA, ok := teamsToScores[a]
		if !ok {
			teamA = &stat{Name: a}
			teamsToScores[a] = teamA
		}

		teamB, ok := teamsToScores[b]
		if !ok {
			teamB = &stat{Name: b}
			teamsToScores[b] = teamB
		}

		switch outcome {
		case "win":
			teamA.Wins++
			teamA.Points += 3
			teamB.Loses++
		case "loss":
			teamB.Wins++
			teamB.Points += 3
			teamA.Loses++
		case "draw":
			teamA.Draws++
			teamA.Points++
			teamB.Draws++
			teamB.Points++
		default:
			return fmt.Errorf("unexpected outcome %s", outcome)
		}
		teamA.MatchesPlayed++
		teamB.MatchesPlayed++
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	sortedTeams := make([]*stat, 0, len(teamsToScores))
	for _, team := range teamsToScores {
		sortedTeams = append(sortedTeams, team)
	}

	sort.Slice(sortedTeams, func(i, j int) bool {
		if sortedTeams[i].Points != sortedTeams[j].Points {
			return sortedTeams[i].Points > sortedTeams[j].Points
		}
		return sortedTeams[i].Name < sortedTeams[j].Name
	})

	header := fmt.Sprintf("%-30s |%3s |%3s |%3s |%3s |%3s\n", "Team", "MP", "W", "D", "L", "P")
	output := new(strings.Builder)
	output.WriteString(header)

	for _, team := range sortedTeams {
		row := fmt.Sprintf("%-30s |%3d |%3d |%3d |%3d |%3d\n", team.Name, team.MatchesPlayed, team.Wins, team.Draws, team.Loses, team.Points)
		output.WriteString(row)
	}

	_, err := io.WriteString(w, output.String())
	return err
}