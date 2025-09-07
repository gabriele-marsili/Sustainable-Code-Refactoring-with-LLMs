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
	wins   int
	losses int
	draws  int
	points int
	played int
}

func Tally(reader io.Reader, writer io.Writer) error {
	teams := make(map[string]*team)
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.Split(line, ";")
		if len(parts) != 3 {
			return fmt.Errorf("invalid input line: %s", line)
		}

		team1Name := parts[0]
		team2Name := parts[1]
		result := parts[2]

		team1, ok := teams[team1Name]
		if !ok {
			team1 = &team{name: team1Name}
			teams[team1Name] = team1
		}

		team2, ok := teams[team2Name]
		if !ok {
			team2 = &team{name: team2Name}
			teams[team2Name] = team2
		}

		team1.played++
		team2.played++

		switch result {
		case "win":
			team1.wins++
			team1.points += 3
			team2.losses++
		case "loss":
			team2.wins++
			team2.points += 3
			team1.losses++
		case "draw":
			team1.draws++
			team1.points++
			team2.draws++
			team2.points++
		default:
			return fmt.Errorf("invalid result: %s", result)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	teamList := make([]*team, 0, len(teams))
	for _, team := range teams {
		teamList = append(teamList, team)
	}

	sort.Slice(teamList, func(i, j int) bool {
		if teamList[i].points != teamList[j].points {
			return teamList[i].points > teamList[j].points
		}
		return teamList[i].name < teamList[j].name
	})

	header := "Team                           | MP |  W |  D |  L |  P\n"
	_, err := io.WriteString(writer, header)
	if err != nil {
		return err
	}

	for _, team := range teamList {
		row := fmt.Sprintf("%-31s| %2d | %2d | %2d | %2d | %2d\n", team.name, team.played, team.wins, team.draws, team.losses, team.points)
		_, err = io.WriteString(writer, row)
		if err != nil {
			return err
		}
	}

	return nil
}