package tournament

import (
	"bufio"
	"fmt"
	"io"
	"sort"
	"strings"
)

type teamStats struct {
	name   string
	wins   int
	draws  int
	losses int
	points int
}

func Tally(reader io.Reader, writer io.Writer) error {
	teams := make(map[string]*teamStats)
	scanner := bufio.NewScanner(reader)
	
	// Process input line by line
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
		
		// Initialize teams if not exists
		if teams[team1] == nil {
			teams[team1] = &teamStats{name: team1}
		}
		if teams[team2] == nil {
			teams[team2] = &teamStats{name: team2}
		}
		
		// Update stats based on result
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
	
	// Convert map to slice for sorting
	teamList := make([]*teamStats, 0, len(teams))
	for _, team := range teams {
		teamList = append(teamList, team)
	}
	
	// Sort by points (desc), then by name (asc)
	sort.Slice(teamList, func(i, j int) bool {
		if teamList[i].points == teamList[j].points {
			return teamList[i].name < teamList[j].name
		}
		return teamList[i].points > teamList[j].points
	})
	
	// Write header
	fmt.Fprintf(writer, "%-30s | %2s | %2s | %2s | %2s | %2s\n", 
		"Team", "MP", "W", "D", "L", "P")
	
	// Write team stats
	for _, team := range teamList {
		mp := team.wins + team.draws + team.losses
		fmt.Fprintf(writer, "%-30s | %2d | %2d | %2d | %2d | %2d\n",
			team.name, mp, team.wins, team.draws, team.losses, team.points)
	}
	
	return nil
}