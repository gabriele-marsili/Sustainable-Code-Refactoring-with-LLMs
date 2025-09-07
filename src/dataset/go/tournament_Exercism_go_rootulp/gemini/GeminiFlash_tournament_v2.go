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

		if len(line) == 0 || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.Split(line, ";")
		if len(parts) != 3 {
			return fmt.Errorf("invalid input line: %s", line)
		}

		teamA, teamB, outcome := parts[0], parts[1], parts[2]

		if _, ok := teamsToScores[teamA]; !ok {
			teamsToScores[teamA] = &stat{Name: teamA}
		}
		if _, ok := teamsToScores[teamB]; !ok {
			teamsToScores[teamB] = &stat{Name: teamB}
		}

		switch outcome {
		case "win":
			teamsToScores[teamA].Wins++
			teamsToScores[teamA].Points += 3
			teamsToScores[teamB].Loses++
		case "loss":
			teamsToScores[teamB].Wins++
			teamsToScores[teamB].Points += 3
			teamsToScores[teamA].Loses++
		case "draw":
			teamsToScores[teamA].Draws++
			teamsToScores[teamA].Points++
			teamsToScores[teamB].Draws++
			teamsToScores[teamB].Points++
		default:
			return fmt.Errorf("invalid outcome: %s", outcome)
		}
		teamsToScores[teamA].MatchesPlayed++
		teamsToScores[teamB].MatchesPlayed++
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
	output := header

	for _, team := range sortedTeams {
		output += fmt.Sprintf("%-30s |%3d |%3d |%3d |%3d |%3d\n",
			team.Name, team.MatchesPlayed, team.Wins, team.Draws, team.Loses, team.Points)
	}

	_, err := io.WriteString(w, output)
	return err
}