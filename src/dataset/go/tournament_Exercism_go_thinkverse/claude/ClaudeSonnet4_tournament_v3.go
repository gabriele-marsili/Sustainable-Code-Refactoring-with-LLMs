package tournament

import (
	"bufio"
	"fmt"
	"io"
	"sort"
	"strings"
)

type teamStats struct {
	matches int
	wins    int
	draws   int
	losses  int
	points  int
}

func Tally(reader io.Reader, writer io.Writer) error {
	teams := make(map[string]*teamStats)
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
			teams[team1] = &teamStats{}
		}
		if teams[team2] == nil {
			teams[team2] = &teamStats{}
		}
		
		teams[team1].matches++
		teams[team2].matches++
		
		switch result {
		case "win":
			teams[team1].wins++
			teams[team1].points += 3
			teams[team2].losses++
		case "loss":
			teams[team2].wins++
			teams[team2].points += 3
			teams[team1].losses++
		case "draw":
			teams[team1].draws++
			teams[team1].points++
			teams[team2].draws++
			teams[team2].points++
		}
	}
	
	if err := scanner.Err(); err != nil {
		return err
	}
	
	teamNames := make([]string, 0, len(teams))
	for name := range teams {
		teamNames = append(teamNames, name)
	}
	
	sort.Slice(teamNames, func(i, j int) bool {
		if teams[teamNames[i]].points != teams[teamNames[j]].points {
			return teams[teamNames[i]].points > teams[teamNames[j]].points
		}
		return teamNames[i] < teamNames[j]
	})
	
	fmt.Fprintf(writer, "%-30s | %2s | %2s | %2s | %2s | %2s\n", "Team", "MP", "W", "D", "L", "P")
	
	for _, name := range teamNames {
		stats := teams[name]
		fmt.Fprintf(writer, "%-30s | %2d | %2d | %2d | %2d | %2d\n",
			name, stats.matches, stats.wins, stats.draws, stats.losses, stats.points)
	}
	
	return nil
}