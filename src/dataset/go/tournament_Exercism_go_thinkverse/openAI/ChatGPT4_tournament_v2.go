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
	Won    int
	Drawn  int
	Lost   int
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
			continue
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
			teams[team1].Won++
			teams[team1].Points += 3
			teams[team2].Lost++
		case "loss":
			teams[team2].Won++
			teams[team2].Points += 3
			teams[team1].Lost++
		case "draw":
			teams[team1].Drawn++
			teams[team2].Drawn++
			teams[team1].Points++
			teams[team2].Points++
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

	fmt.Fprintf(writer, "%-31s| MP |  W |  D |  L |  P\n", "Team")
	for _, team := range sortedTeams {
		fmt.Fprintf(writer, "%-31s| %2d | %2d | %2d | %2d | %2d\n",
			team.Name, team.Played, team.Won, team.Drawn, team.Lost, team.Points)
	}

	return nil
}