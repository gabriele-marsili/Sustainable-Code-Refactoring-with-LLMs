package tournament

import (
	"bufio"
	"fmt"
	"io"
	"sort"
	"strings"
)

type team struct {
	name   string
	played int
	won    int
	drawn  int
	lost   int
	points int
}

func Tally(reader io.Reader, writer io.Writer) error {
	teams := make(map[string]*team)
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
			teams[team1] = &team{name: team1}
		}
		if teams[team2] == nil {
			teams[team2] = &team{name: team2}
		}

		teams[team1].played++
		teams[team2].played++

		switch result {
		case "win":
			teams[team1].won++
			teams[team1].points += 3
			teams[team2].lost++
		case "loss":
			teams[team2].won++
			teams[team2].points += 3
			teams[team1].lost++
		case "draw":
			teams[team1].drawn++
			teams[team2].drawn++
			teams[team1].points++
			teams[team2].points++
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	sortedTeams := make([]*team, 0, len(teams))
	for _, t := range teams {
		sortedTeams = append(sortedTeams, t)
	}

	sort.Slice(sortedTeams, func(i, j int) bool {
		if sortedTeams[i].points == sortedTeams[j].points {
			return sortedTeams[i].name < sortedTeams[j].name
		}
		return sortedTeams[i].points > sortedTeams[j].points
	})

	fmt.Fprintf(writer, "%-31s| MP |  W |  D |  L |  P\n", "Team")
	for _, t := range sortedTeams {
		fmt.Fprintf(writer, "%-31s| %2d | %2d | %2d | %2d | %2d\n",
			t.name, t.played, t.won, t.drawn, t.lost, t.points)
	}

	return nil
}