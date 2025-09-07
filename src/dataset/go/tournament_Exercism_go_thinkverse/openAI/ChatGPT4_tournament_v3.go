package tournament

import (
	"bufio"
	"fmt"
	"io"
	"sort"
	"strings"
)

type Team struct {
	Name   string
	Played int
	Wins   int
	Draws  int
	Losses int
	Points int
}

func Tally(reader io.Reader, writer io.Writer) error {
	teams := make(map[string]*Team)
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.Split(line, ";")
		if len(parts) != 3 {
			return fmt.Errorf("invalid input line: %s", line)
		}

		team1, team2, result := parts[0], parts[1], parts[2]

		if teams[team1] == nil {
			teams[team1] = &Team{Name: team1}
		}
		if teams[team2] == nil {
			teams[team2] = &Team{Name: team2}
		}

		teams[team1].Played++
		teams[team2].Played++

		switch result {
		case "win":
			teams[team1].Wins++
			teams[team1].Points += 3
			teams[team2].Losses++
		case "loss":
			teams[team2].Wins++
			teams[team2].Points += 3
			teams[team1].Losses++
		case "draw":
			teams[team1].Draws++
			teams[team2].Draws++
			teams[team1].Points++
			teams[team2].Points++
		default:
			return fmt.Errorf("invalid match result: %s", result)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	sortedTeams := make([]*Team, 0, len(teams))
	for _, team := range teams {
		sortedTeams = append(sortedTeams, team)
	}

	sort.Slice(sortedTeams, func(i, j int) bool {
		if sortedTeams[i].Points == sortedTeams[j].Points {
			return sortedTeams[i].Name < sortedTeams[j].Name
		}
		return sortedTeams[i].Points > sortedTeams[j].Points
	})

	header := "Team                           | MP |  W |  D |  L |  P\n"
	if _, err := writer.Write([]byte(header)); err != nil {
		return err
	}

	for _, team := range sortedTeams {
		line := fmt.Sprintf("%-31s| %2d | %2d | %2d | %2d | %2d\n",
			team.Name, team.Played, team.Wins, team.Draws, team.Losses, team.Points)
		if _, err := writer.Write([]byte(line)); err != nil {
			return err
		}
	}

	return nil
}